var React = require('react');
var LoggedInLayout = require('./layouts/loggedInLayout');

class NoMatchesLoggedIn extends React.Component {
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
                    <LoggedInLayout username={this.props.username}>
                    <div className="pb-4">
                        <p className="font-weight-normal" style={{fontSize: "24px"}}>Sorry, a dupe for '{this.props.product_shade_name}' does not exist in our database.</p>
                        <ul>{productDetails}</ul>
                        <p>Would you like to <a href="/dupes/new" style={{color: '#ddb3b3'}}>submit a new dupe</a>?</p>
                    </div>
                    </LoggedInLayout>
            )
    }
}

module.exports = NoMatchesLoggedIn;