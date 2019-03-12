var React = require('react');
var AdminLayout = require('./layouts/adminLayout');

class NoMatchesAsAdmin extends React.Component {
    render() {


        const productDetails = this.props.product_details.map ( detail => {
            return (

                <div className="font-weight-normal">
                    <img src={detail.product_swatch_link} style={{maxHeight: '180px'}}/><br />
                    <b>Product Brand</b>: {detail.brand}<br />
                    <b>Product Shade Name</b>: {detail.shade_name}<br />
                    <b>Product Type</b>: {detail.type}<br />
                    <b>Product Price</b>: ${detail.price}<br />
                </div>

                )
        })


        return (
                    <AdminLayout>
                    <div className="pb-4">
                        <p className="font-weight-normal" style={{fontSize: '24px'}}>No dupes for '{this.props.product_shade_name}' exist in the database.</p>
                        <ul>{productDetails}</ul>
                        <p><a href="/dupes/new" style={{color: '#ddb3b3'}}>Create a new dupe</a></p>
                    </div>
                    </AdminLayout>
            )
    }
}

module.exports = NoMatchesAsAdmin;