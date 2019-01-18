const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const pg = require('pg');
const sha256 = require('js-sha256');

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
    } else {
        //else, display home page as a user who is logged in (i.e. can SUBMIT A DUPE / LOG OUT)
        //a LOGGED-IN user can: submit a dupe / submit a review / rate accuracy of a dupe
        var username = request.cookies['username'];
        console.log("username from existing cookie: ", username);
        response.render('layouts/loggedInLayout', {username});
    }


    //allow user to register a new account
    app.get('/users/new', (request, response) => {
        response.render('user/NewUser');
    });


    //allow user to log in
    app.get('/login', (request, response) => {
        response.render('loginPage');
    });

    app.post('/login',  (request, response) => {

        //if the username and password match those in the database, log them in
        let query = "SELECT * FROM users WHERE username='"+request.body.username+"'";

        pool.query(query, (err, queryResponse) => {

            //if the user doesn't exist
            if (queryResponse.rows.length === 0) {
                console.log("user doesn't exist");
                response.send("<html><body><h3>User does not exist!</h3><br /><button><a href='/'>Home</a></button><button><a href='/login'>Back to Login Page</a></button>");
            } else {
                //if the user exists, check for correct password
                console.log("user exists");

                const user = queryResponse.rows[0];
                let hashedPassword = user.password;
                let formHashedPassword = sha256(request.body.password);

                console.log("we are comparing 2 hashed values -");
                console.log("one from the DB: " + hashedPassword);
                console.log("and one from the login form: " + formHashedPassword);

                if (formHashedPassword === hashedPassword) {
                    //correct password
                    console.log('correct password');

                    //set up hashed cookie
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
                    response.send("<html><body><h3>Incorrect password!</h3><br /><button><a href='/'>Home</a></button><button><a href='/login'>Back to Login Page</a></button>");
                }
            }
        })
    });

    app.get('/logout', (request, response) => {
        console.log('user has logged out');
        response.clearCookie('hashedLoginCookie');
        response.clearCookie('loggedin');
        response.clearCookie('username');
        // response.send("You have logged out!");
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
        response.send("<html><body><h3>User created!</h3><br /><button><a href='/'>Home</a></button><button><a href='/login'>Login</a></button>")
    });
});

//display search results
app.post('/search/dupes/results', (request, response) => {

    //search for existence of product in database
    const doesProductExist = `SELECT brand, shade_name, type, price FROM products WHERE LOWER (shade_name) LIKE $1`;
    let values = ['%' + request.body.search.toLowerCase() + '%'];

    pool.query(doesProductExist, values, (error, queryResponse) => {

        if (queryResponse.rows.length === 0) {
            //product does not exist in database
            console.log(`searched-for pdt -${request.body.search}- doesnt exist in database`);
            response.send("this pdt doesnt exist in the database. enable user to submit a pdt if logged in")
        } else {
            //product exists in database
            console.log("matching products that exist in database: ", queryResponse.rows);
            const matchedExistingProducts = queryResponse.rows;
            console.log(`since product -${request.body.search}- exists in database, now search for its dupes`);
            //response.send("product exists in database!");

            //now, search for product's dupes (if any)
            const searchInput = `SELECT a.*,
                        products.brand AS dupe_brand,
                        products.shade_name AS dupe_shade_name,
                        products.type AS dupe_type,
                        products.price AS dupe_price
                        FROM
                            (SELECT
                            products.product_id AS product_id,
                            products.brand AS product_brand,
                            products.shade_name AS product_shade_name,
                            products.type AS product_type,
                            products.price AS product_price,
                            dupes.dupe_id
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

                    //to ensure that, when user is logged in, user's username is showed on the page
                    var username = request.cookies['username'];
                    console.log("username from existing cookie after searching for dupe: ", username);

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

                }

            });
        }
    });

});

//display form to CREATE a new product/dupe relationship
app.get('/dupes/new', (request, response) => {
    var loggedin = request.cookies['loggedin'];

    if (loggedin === undefined) {
        response.render('submitDupe');
    } else {
        var username = request.cookies['username'];
        response.render('submitDupeLoggedIn', {username: username});
    };
});

//accepts and posts newly-submitted product/dupe relationship
app.post('/dupes/new', (request, response) => {
    //write logic to insert new pdt/dupe rs data (from form) into dupes database
    console.log("Submitted info from submission form: ", request.body)

    //inserting pdt info and dupe info into PRODUCTS table (since dupes are products too)
    const newSubmission = `INSERT INTO products (brand, shade_name, type, price)
                            VALUES ($1, $2, $3, $4),
                                   ($5, $6, $7, $8);`
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
        console.log("submitted values pushed into db: ", result.rows);

        //in PRODUCTS table
        //if submitted pdts (the dupe OR the pdt OR (the dupe AND the pdt)) already exist in db (check by comparing the combination of their FULL shade names AND brand), delete the duplicate entries using their own IDs

        //return the IDs of the pdts (the dupe and the pdt) which remained in the db (the OGs, not the duplicates)

            //in DUPES table
            //create the (pdt, dupe) rs tt the user submitted using their IDs i.e. insert into DUPES table


        //else, create new pdt in db

        //return ID of newly-created pdt

            //in DUPES table
            //create the (pdt, dupe) rs tt the user submitted using their IDs i.e. insert into DUPES table









        var username = request.cookies['username'];
        let display = {};
        display.username = username;
        display.values = values;
        response.render('displaySubmittedDupe', display)



    })
})


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */

const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function(){

  server.close(() => {
    console.log('Process terminated')
    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);
