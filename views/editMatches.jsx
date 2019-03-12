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
                
                <form method='POST' action={'/dupes/' + result.rs_id + "/put?_method=PUT"} className="pb-4">
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label for="pdtID">Product ID</label>                            
                            <input name="pdtId" type="text" class="form-control" id="pdtID" defaultValue={result.product_id} style={{width: '30%'}} />           
                        </div>

                        <div class="form-group col-md-4">
                            <label for="dupeID">Dupe ID</label>                            
                            <input name="dupeId" type="text" class="form-control" id="dupeID" defaultValue={result.dupe_id} style={{width: '30%'}} />
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label for="similarity">Similarity (%)</label>
                            <input name="similarity" type="text" class="form-control" id="similarity" defaultValue={result.similarity} style={{width: '30%'}} />
                        </div>
                    </div>

                    <button type="submit" class="btn" style={{ backgroundColor: '#ddb3b3', color: 'white' }}>Edit</button>
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