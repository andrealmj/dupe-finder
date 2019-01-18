var React = require('react');
var LoggedInLayout = require('./layouts/loggedInLayout');

class DisplaySubmittedDupe extends React.Component {
    render() {

        const submittedInformation = this.props.values.map ( value => {
            return (
                <div>
                    <li>Product Brand: {value.product_brand}</li>
                    <li>Product Shade Name: {value.product_shade_name}</li>
                    <li>Product Type: {value.product_type}</li>
                    <li>Product Price: ${value.product_price}</li>

                    <br />

                    <li>Dupe Brand: {value.dupe_brand}</li>
                    <li>Dupe Shade Name: {value.dupe_shade_name}</li>
                    <li>Dupe Type: {value.dupe_type}</li>
                    <li>Dupe Price: ${value.dupe_price}</li>
                    <br />
                </div>
                )
        })


        return (

            <LoggedInLayout username={this.props.username}>
                <h3>Thanks for your dupe submission!</h3>

                <p>Your submission is now in the database.</p>

            </LoggedInLayout>

            )
    }
}

module.exports = DisplaySubmittedDupe;