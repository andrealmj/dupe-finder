const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const pg = require('pg');
const sha256 = require('js-sha256');
const axios = require('axios');

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/andrea-mj-lim';
const CLOUDINARY_UPLOAD_PRESET = 'ddoudxwj';

const SALT = "better than temptalia";

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

const configs = {
  user: 'andrealmj',
  host: '127.0.0.1',
  database: 'dupefinderdb',
  port: 5432,
  password: 'pg'
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

// Init express app
const app = express();

// Set up middleware
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.urlencoded({
  extended: true
}));

// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Routes
 * ===================================
 */

// Root GET request (it doesn't belong in any controller file)
app.get('/', (request, response) => {

    var loggedin = request.cookies['loggedin'];

    //check if user is logged in (i.e. loggedin cookie exists)

    //if user is NOT logged in (i.e. loggedin cookie is not defined)
    if ( loggedin === undefined ) {
        //display home page as a user who is NOT logged in (i.e. can SIGN UP / LOG IN)
        response.render('layouts/defaultLayout');
    } else { //user is logged in

        //to check if user is admin
        var isAdmin = request.cookies['admin'];

        //user is not admin
        if (isAdmin === undefined) {
            var username = request.cookies['username'];
            console.log("username from existing cookie: ", username);
            response.render('layouts/loggedInLayout', {username});
        } else { //user is admin
            response.render('layouts/adminLayout');
        }
    }


    //allow user to register a new account
    app.get('/users/new', (request, response) => {
        response.render('user/NewUser');
    });


    //allow user to log in
    // app.get('/login', (request, response) => {
    //     response.render('loginPage');
    // });

    app.post('/login',  (request, response) => {

        //if the username and password match those in the database, log them in
        let query = "SELECT * FROM users WHERE username='"+request.body.username+"'";

        pool.query(query, (err, queryResponse) => {

            //if the user doesn't exist
            if (queryResponse.rows.length === 0) {
                console.log("user doesn't exist");
                response.render('user/NoSuchUser');
            } else {
                //if the user exists, check for type of acc (admin or normal user)
                console.log("user exists");

                const user = queryResponse.rows[0];
                console.log("user const: ", user);
                let hashedPassword = user.password;
                let formHashedPassword = sha256(request.body.password);

                console.log("we are comparing 2 hashed values -");
                console.log("one from the DB: " + hashedPassword);
                console.log("and one from the login form: " + formHashedPassword);

                //check if user is an admin (i.e. user = 'andrea')
                if (user.username === 'andrea') {

                    //check for correct pw
                    if (formHashedPassword === hashedPassword) {

                    //correct password
                    console.log('correct password');
                    console.log('logged in as administrator');

                    //set up hashed cookies (incl admin cookie)
                    let hashedCookie = sha256( user.id + SALT);
                    response.cookie('hashedLoginCookie', hashedCookie);
                    response.cookie('loggedin', 'true');
                    response.cookie('username', user.username);
                    response.cookie('admin', 'true');

                    // let results = {}
                    // results.username = user.username;
                    // console.log("results", results);

                    response.render('layouts/adminLayout');
                } else {
                    //incorrect password
                    console.log("incorrect password");
                    response.render('user/IncorrectPassword');
                }
            } else { //if not 'andrea', check for correct pw to log normal user in
                    if (formHashedPassword === hashedPassword) {

                    //correct password
                    console.log('correct password');

                    //set up hashed cookies
                    let hashedCookie = sha256( user.id + SALT);
                    response.cookie('hashedLoginCookie', hashedCookie);
                    response.cookie('loggedin', 'true');
                    response.cookie('username', user.username);

                    let results = {}
                    results.username = user.username;
                    console.log("results", results);

                    response.render('layouts/loggedInLayout', results);
                } else {
                    //incorrect password
                    console.log("incorrect password");
                    response.render('user/IncorrectPassword');
                }

                }
            }
        })
    });

    app.get('/logout', (request, response) => {
        console.log('user has logged out');
        response.clearCookie('hashedLoginCookie');
        response.clearCookie('loggedin');
        response.clearCookie('username');
        response.clearCookie('admin');
        response.redirect('/');
    });
});

//accept newly-registered user data
app.post('/users', (request, response) => {

    console.log("accept newly-registered user data: ", request.body);

    let hashedPassword = sha256(request.body.password);
    console.log("hashed password: ", hashedPassword);

    const queryString = 'INSERT INTO users (username, password) VALUES ($1, $2)';
    let values = [
        request.body.username,
        hashedPassword
    ];

    pool.query(queryString, values, (error, result) => {
        //response.redirect('/');
        //response.cookie('loggedin', 'true');
        response.render('user/createdNewUser');
    });
});

//display search results
app.post('/search/dupes/results', (request, response) => {

    //search for existence of product in database
    const doesProductExist = `SELECT product_swatch_link, brand, shade_name, type, price FROM products WHERE LOWER (shade_name) LIKE $1`;
    let values = ['%' + request.body.search.toLowerCase() + '%'];

    pool.query(doesProductExist, values, (error, queryResponse) => {

        //product does not exist in database
        if (queryResponse.rows.length === 0) {
            console.log(`searched-for pdt -${request.body.search}- doesnt exist in database`);

            //to check if user is logged in or not
            var loggedin = request.cookies['loggedin'];

            //if user is not logged in
            if (loggedin === undefined) {

                response.render('noProduct', {product_shade_name: request.body.search});
            } else { //if user is logged in

                //to check if user is admin or not
                var isAdmin = request.cookies['admin'];

                //if user is not admin
                if (isAdmin === undefined) {
                    var username = request.cookies['username'];

                    let displayThisInfo = {};
                    displayThisInfo.product_shade_name = request.body.search;
                    displayThisInfo.username = username;

                    response.render('noProductLoggedIn', displayThisInfo);
                } else { //if user is admin

                    response.render('noProductLoggedInAsAdmin', {product_shade_name: request.body.search});
                }

            }

        } else { //product exists in database
            console.log("matching products that exist in database: ", queryResponse.rows);
            const matchedExistingProducts = queryResponse.rows;
            console.log(`since product -${request.body.search}- exists in database, now search for its dupes`);

            //now, search for product's dupes (if any)
            const searchInput = `SELECT a.*,
                        products.product_swatch_link AS dupe_swatch_link,
                        products.brand AS dupe_brand,
                        products.shade_name AS dupe_shade_name,
                        products.type AS dupe_type,
                        products.price AS dupe_price
                        FROM
                            (SELECT
                            products.product_swatch_link,
                            products.product_id AS product_id,
                            products.brand AS product_brand,
                            products.shade_name AS product_shade_name,
                            products.type AS product_type,
                            products.price AS product_price,
                            dupes.dupe_id,
                            dupes.rs_id,
                            dupes.similarity
                            FROM dupes FULL OUTER JOIN products
                            ON products.product_id = dupes.product_id
                            WHERE LOWER (products.shade_name) LIKE $1) a
                            INNER JOIN products
                        ON products.product_id = a.dupe_id;`
            let values = ['%' + request.body.search.toLowerCase() + '%'];
            //console.log("search input: ", values);

            //to check if user is logged in or not
            var loggedin = request.cookies['loggedin'];

            pool.query(searchInput, values, (error, queryResponse) => {
                console.log("product/dupe match relationships: ", queryResponse.rows);

                //if user is NOT logged in,
                if (loggedin === undefined) {

                    //what to display if NO product/dupe match (i.e. product exists but its dupe doesnt)
                    if (queryResponse.rows.length === 0) {
                        console.log("no dupe found for this existing product");

                        let noMatchInfoToDisplay = {};
                        noMatchInfoToDisplay.product_shade_name = request.body.search.toLowerCase();
                        noMatchInfoToDisplay.product_details = matchedExistingProducts;


                        response.render('noMatches', noMatchInfoToDisplay);
                    } else {
                        //what to display if product/dupe match EXISTS
                        response.render('displayMatches', {matches: queryResponse.rows});
                    }

                } else {
                    //if user is LOGGED IN

                    //to check if user is admin or not
                    var isAdmin = request.cookies['admin'];

                    //to ensure that, when user is logged in, user's username is showed on the page
                    var username = request.cookies['username'];
                    console.log("username from existing cookie after searching for dupe: ", username);

                    //if user is NOT admin,
                    if (isAdmin === undefined) {

                        //what to display if NO product/dupe match (i.e. product exists but its dupe doesnt)
                        if (queryResponse.rows.length === 0) {

                            let noMatchInfoToDisplay = {};
                            noMatchInfoToDisplay.product_shade_name = request.body.search.toLowerCase();
                            noMatchInfoToDisplay.product_details = matchedExistingProducts;
                            noMatchInfoToDisplay.username = username;

                            response.render('noMatchesLoggedIn', noMatchInfoToDisplay);
                        } else {
                            //what to display if product/dupe match EXISTS
                            let infoToDisplay = {}
                            infoToDisplay.matches = queryResponse.rows;
                            infoToDisplay.username = username;
                            console.log("infoToDisplay: ", infoToDisplay);

                            response.render('displayMatchesLoggedIn', infoToDisplay);
                        }

                    } else { //if user is admin

                        console.log("user is admin");

                        //what to display if NO product/dupe match (i.e. product exists but its dupe doesnt)
                        if (queryResponse.rows.length === 0) {

                            let noMatchInfoToDisplay = {};
                            noMatchInfoToDisplay.product_shade_name = request.body.search.toLowerCase();
                            noMatchInfoToDisplay.product_details = matchedExistingProducts;

                            response.render('noMatchesAsAdmin', noMatchInfoToDisplay);
                        } else {
                            //what to display if product/dupe match EXISTS
                            let infoToDisplay = {}
                            infoToDisplay.matches = queryResponse.rows;
                            console.log("infoToDisplay: ", infoToDisplay);

                            response.render('displayMatchesAsAdmin', infoToDisplay);
                        }

                    }



                }

            });
        }
    });

});

//display form to CREATE a new product/dupe relationship
app.get('/dupes/new', (request, response) => {
    var loggedin = request.cookies['loggedin'];

    //if user is not logged in
    if (loggedin === undefined) {
        response.render('submitDupe');
    } else { //if user is logged in

        //to check if user is admin
        var isAdmin = request.cookies['admin'];

        //if user is not admin
        if (isAdmin === undefined) {
            var username = request.cookies['username'];
            response.render('submitDupeLoggedIn', {username: username});

        } else { //if user is admin
            response.render('submitDupeAsAdmin');
        }

    };
});

//accepts and posts newly-submitted product/dupe relationship
app.post('/dupes/new', (request, response) => {
    //write logic to insert new pdt/dupe rs data (from form) into dupes database
    console.log("Submitted info from submission form: ", request.body)

    //inserting pdt info and dupe info into PRODUCTS table (since dupes are products too)
    const newSubmission = `INSERT INTO products (brand, shade_name, type, price)
                            VALUES ($1, $2, $3, $4),
                                   ($5, $6, $7, $8)
                            RETURNING product_id;`
    let values = [request.body.submittedDupeBrand,
                  request.body.submittedDupeShadeName,
                  request.body.submittedDupeType,
                  request.body.submittedDupePrice,
                  request.body.submittedPdtBrand,
                  request.body.submittedPdtShadeName,
                  request.body.submittedPdtType,
                  request.body.submittedPdtPrice,
    ];

    pool.query(newSubmission, values, (error, result) => {
        console.log("IDs of products that were just inserted: ", result.rows);

        //in DUPES table

        //create the (pdt, dupe) rs tt the user submitted using their IDs i.e. insert into DUPES table
        values = [result.rows[0].product_id,
                  result.rows[1].product_id,
                  request.body.similarity,
        ]

        console.log("value after insert product", values);
        const createPdtDupeRs = `INSERT INTO dupes (dupe_id, product_id, similarity) VALUES ($1, $2, $3);`
        pool.query(createPdtDupeRs, values, (error, queryResult) => {
            console.log("data inserted into dupes table: ", queryResult);

        })

        //to check if user is admin
        var isAdmin = request.cookies['admin'];

        //if user is not admin
        if (isAdmin === undefined) {

        var username = request.cookies['username'];
        let display = {};
        display.username = username;
        display.values = values;
        response.render('displaySubmittedDupe', display);

        } else { //if user is admin

        let display = {};
        display.values = values;
        response.render('displayAdminSubmittedDupe', display);

        }

    })
});

//view all pdt/dupe relationships
app.get('/view/all', (request, response) => {
    let showAllRelationships = `SELECT a.*,
                                products.product_swatch_link AS dupe_swatch_link,
                                products.brand AS dupe_brand,
                                products.shade_name AS dupe_shade_name,
                                products.type AS dupe_type,
                                products.price AS dupe_price
                                FROM
                                    (SELECT
                                    products.product_swatch_link,
                                    products.product_id AS product_id,
                                    products.brand AS product_brand,
                                    products.shade_name AS product_shade_name,
                                    products.type AS product_type,
                                    products.price AS product_price,
                                    dupes.dupe_id,
                                    dupes.rs_id,
                                    dupes.similarity
                                    FROM dupes FULL OUTER JOIN products
                                    ON products.product_id = dupes.product_id) a
                                    INNER JOIN products
                                ON products.product_id = a.dupe_id;`

    pool.query(showAllRelationships, (err, queryResult) => {
        if (err) {
            console.error('query error: ', err.stack);
            response.send('query error');
        } else {
            response.render('showAll', {results: queryResult.rows});
        }
    });
});

//get a pdt/dupe rs
app.get('/dupes/:id', (request, response) => {
    pool.query(`SELECT * FROM dupes WHERE rs_id = $1`, [request.params.id], (err, queryResult) => {
        if (err) {
            console.error('query error: ', err.stack);
            response.send('query error');
        } else {
            console.log(queryResult.rows);
            response.send(queryResult.rows);
        }
    });
});

//delete a pdt/dupe rs
app.delete('/dupes/:id/delete', (request, response) => {
    pool.query(`DELETE FROM dupes WHERE rs_id = $1`, [request.params.id], (err, queryResult) => {
        if (err) {
            console.error('query error: ', err.stack);
            response.send('query error');
        } else {
            console.log(`Deleted dupe rs id: ${request.params.id} successfully`);
            response.redirect('/view/all');
        }
    });
});

//display form to edit pdt/dupe rs
app.get('/dupes/:id/edit', (request, response) => {
    const showDetailsToEdit = `SELECT a.*,
                                products.product_swatch_link AS dupe_swatch_link,
                                products.brand AS dupe_brand,
                                products.shade_name AS dupe_shade_name,
                                products.type AS dupe_type,
                                products.price AS dupe_price
                                FROM
                                    (SELECT
                                    products.product_swatch_link,
                                    products.product_id AS product_id,
                                    products.brand AS product_brand,
                                    products.shade_name AS product_shade_name,
                                    products.type AS product_type,
                                    products.price AS product_price,
                                    dupes.dupe_id,
                                    dupes.rs_id,
                                    dupes.similarity
                                    FROM dupes FULL OUTER JOIN products
                                    ON products.product_id = dupes.product_id
                                    WHERE dupes.rs_id = $1) a
                                    INNER JOIN products
                                ON products.product_id = a.dupe_id;`
    values = [request.params.id];
    pool.query(showDetailsToEdit, values, (err, queryResult) => {
        if (err) {
            console.error('query error: ', err.stack);
            response.send('query error');
        } else {
            console.log("full details from rs that is to be edited: ", queryResult.rows);
            response.render('editMatches', {results: queryResult.rows});
        }
    })
});

//submitted edited pdt/dupe rs details
app.put('/dupes/:id/put', (request, response) => {
    const updateRs = `UPDATE dupes SET product_id = $1, dupe_id = $2, similarity = $3 WHERE rs_id = $4`;
    let values = [request.body.pdtId, request.body.dupeId, request.body.similarity, request.params.id];

    pool.query(updateRs, values, (err, result) => {
        if (err) {
            console.error('query error: ', err.stack);
            response.send('query error');
        } else {
            console.log(`successfully edited pdt / dupe rs no. ${request.params.id}`);
        }
        response.redirect('/view/all');
    });

});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log('~~~ Tuning in to the waves of port '+PORT+' ~~~'));

let onClose = function(){

  server.close(() => {
    console.log('Process terminated')
    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);
