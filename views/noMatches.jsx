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
                    <div className="pb-4">
                        <p className="font-weight-normal" style={{fontSize: "24px"}}>Sorry, a dupe for '{this.props.product_shade_name}' does not exist in our database.</p>
                        <ul>{productDetails}</ul>
                        <p>Please log in to submit a new dupe.</p>
                    </div>
                    </DefaultLayout>
            )
    }
}

module.exports = NoMatches;