var React = require('react');
var AdminLayout = require('./layouts/adminLayout');

class NoMatchesAsAdmin extends React.Component {
    render() {


        const productDetails = this.props.product_details.map ( detail => {
            return (

                <div>
                    <b>Product Brand</b>: {detail.brand}<br />
                    <b>Product Shade Name</b>: {detail.shade_name}<br />
                    <b>Product Type</b>: {detail.type}<br />
                    <b>Product Price</b>: ${detail.price}<br />
                </div>

                )
        })


        return (
                    <AdminLayout>
                    <div>
                        <h2>No dupes for '{this.props.product_shade_name}' exist in the database.</h2>
                        <ul>{productDetails}</ul>
                        <p><a href="/dupes/new">Create a new dupe</a></p>
                    </div>
                    </AdminLayout>
            )
    }
}

module.exports = NoMatchesAsAdmin;