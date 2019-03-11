var React = require('react');
var DefaultLayout = require('./layouts/defaultLayout');

class NoMatches extends React.Component {
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
                    <DefaultLayout>
                    <div>
                        <h2>Sorry, a dupe for '{this.props.product_shade_name}' does not exist in our database.</h2>
                        <ul>{productDetails}</ul>
                        <p>Please log in to <a href="/dupes/new">submit a new dupe</a>.</p>
                    </div>
                    </DefaultLayout>
            )
    }
}

module.exports = NoMatches;