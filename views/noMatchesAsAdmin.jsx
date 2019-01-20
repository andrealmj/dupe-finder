var React = require('react');
var AdminLayout = require('./layouts/adminLayout');

class NoMatchesAsAdmin extends React.Component {
    render() {


        const productDetails = this.props.product_details.map ( detail => {
            return (

                <div>
                    <li>Product Brand: {detail.brand}</li>
                    <li>Product Shade Name: {detail.shade_name}</li>
                    <li>Product Type: {detail.type}</li>
                    <li>Product Price: ${detail.price}</li>
                </div>

                )
        })


        return (
                    <AdminLayout>
                    <div>
                        <h2>Sorry, a dupe for '{this.props.product_shade_name}' does not exist in our database.</h2>
                        <ul>{productDetails}</ul>
                        <p>Would you like to <a href="/dupes/new">submit a new dupe</a>?</p>
                    </div>
                    </AdminLayout>
            )
    }
}

module.exports = NoMatchesAsAdmin;