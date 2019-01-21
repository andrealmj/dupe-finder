var React = require('react');
var AdminLayout = require('./layouts/adminLayout');

class EditMatches extends React.Component {
    render() {

        const listOfResults = this.props.results.map( result => {
            return (
                <div className="container">
                    <div className="row">
                        <p>RS id: {result.rs_id}</p>
                    </div>

                    <div className="row">
                        <div className="col">
                            <li>Product Brand: {result.product_brand}</li>
                            <li>Product Shade Name: {result.product_shade_name}</li>
                            <li>Product Type: {result.product_type}</li>
                            <li>Product Price: ${result.product_price}</li>

                            <br />
                        </div>


                        <div className="col">
                            <li>Dupe Brand: {result.dupe_brand}</li>
                            <li>Dupe Shade Name: {result.dupe_shade_name}</li>
                            <li>Dupe Type: {result.dupe_type}</li>
                            <li>Dupe Price: ${result.dupe_price}</li>

                            <br />
                        </div>

                        <div className="col">
                        <p>Similarity: {result.similarity}%</p>
                        </div>

                    </div>

                <h3>Edit product/dupe relationship:</h3>
                <form method='POST' action={'/dupes/' + result.rs_id + "/put?_method=PUT"}>
                    Product ID: <input type='text' name='pdtId' placeholder='product ID' defaultValue={result.product_id}/><br />
                    Dupe ID: <input type='text' name='dupeId' placeholder='dupe ID' defaultValue={result.dupe_id}/><br />
                    Similarity: <input type='text' name='similarity' placeholder='similarity' defaultValue={result.similarity}/>%
                    <input type='submit' value='Submit'/>
                </form>

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

module.exports = EditMatches;