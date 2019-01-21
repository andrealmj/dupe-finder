var React = require('react');
var AdminLayout = require('./layouts/adminLayout');

class ShowAll extends React.Component {
    render() {

        const listOfResults = this.props.results.map( result => {
            return (
                <div className="container">
                    <div className="row border bg-light my-3 py-3">

                        <div className="col">
                            <img src={result.product_swatch_link} style={{maxHeight: '180px'}}/>
                            <li>Product ID: {result.product_id}</li>
                            <li>Product Brand: {result.product_brand}</li>
                            <li>Product Shade Name: {result.product_shade_name}</li>
                            <li>Product Type: {result.product_type}</li>
                            <li>Product Price: ${result.product_price}</li>

                            <br />
                        </div>


                        <div className="col">
                            <img src={result.dupe_swatch_link} style={{maxHeight: '180px'}}/>
                            <li>Dupe ID: {result.dupe_id}</li>
                            <li>Dupe Brand: {result.dupe_brand}</li>
                            <li>Dupe Shade Name: {result.dupe_shade_name}</li>
                            <li>Dupe Type: {result.dupe_type}</li>
                            <li>Dupe Price: ${result.dupe_price}</li>
                        </div>

                        <div className="col">
                            <p>RS id: {result.rs_id}</p>
                            <p>Similarity: {result.similarity}%</p>


                            <form method='GET' action={'/dupes/' + result.rs_id + '/edit'}>
                                <input type='submit' value='Edit'/>
                            </form>

                            <form method="POST" action ={'/dupes/' + result.rs_id + '/delete?_method=DELETE'}>
                                <input type="submit" value="Delete"/>
                            </form>


                        </div>

                    </div>

                </div>
                )
        })

        return (

                    <AdminLayout>
                    <div><ul>{listOfResults}</ul></div>
                    </AdminLayout>

            )
    }
}

module.exports = ShowAll;