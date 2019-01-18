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

                <ul>
                <li>Product Brand: {this.props.values[4]}</li>
                <li>Product Shade Name: {this.props.values[5]}</li>
                <li>Product Type: {this.props.values[6]}</li>
                <li>Product Price: ${this.props.values[7]}</li>
                </ul>

                <ul>
                <li>Dupe Brand: {this.props.values[0]}</li>
                <li>Dupe Shade Name: {this.props.values[1]}</li>
                <li>Dupe Type: {this.props.values[2]}</li>
                <li>Dupe Price: ${this.props.values[3]}</li>
                </ul>



            </LoggedInLayout>

            )
    }
}

module.exports = DisplaySubmittedDupe;