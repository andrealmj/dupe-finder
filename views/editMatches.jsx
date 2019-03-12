var React = require('react');
var AdminLayout = require('./layouts/adminLayout');

class EditMatches extends React.Component {
    render() {

        const listOfResults = this.props.results.map( result => {
            return (
                <div className="container">

                    <div className="row">
                        <div className="col">
                            <img src={result.product_swatch_link} style={{maxHeight: '180px'}}/><br />
                            <b>Product Brand</b>: {result.product_brand}<br />
                            <b>Product Shade Name</b>: {result.product_shade_name}<br />
                            <b>Product Type</b>: {result.product_type}<br />
                            <b>Product Price</b>: ${result.product_price}<br />

                            <br />
                        </div>


                        <div className="col">
                            <img src={result.dupe_swatch_link} style={{maxHeight: '180px'}}/><br />
                            <b>Dupe Brand</b>: {result.dupe_brand}<br />
                            <b>Dupe Shade Name</b>: {result.dupe_shade_name}<br />
                            <b>Dupe Type</b>: {result.dupe_type}<br />
                            <b>Dupe Price</b>: ${result.dupe_price}<br />

                            <br />
                        </div>

                        <div className="col">
                        <b>RS id</b>: {result.rs_id}<br />
                        <b>Similarity</b>: {result.similarity}%
                        </div>

                    </div>

                <p className="font-weight-normal" style={{fontSize: '24px'}}>Edit product/dupe relationship:</p>
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
                    <div>{listOfResults}</div>
                    </AdminLayout>
            )
    }
}

module.exports = EditMatches;