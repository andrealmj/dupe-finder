var React = require('react');
var LoggedInLayout = require('./layouts/loggedInLayout');

class DisplayMatchesLoggedIn extends React.Component {
    render() {

        const listOfMatches = this.props.matches.map( match => {
            return (
                <div>
                    <li>Product Brand: {match.product_brand}</li>
                    <li>Product Shade Name: {match.product_shade_name}</li>
                    <li>Product Type: {match.product_type}</li>
                    <li>Product Price: ${match.product_price}</li>

                    <br />

                    <li>Dupe Brand: {match.dupe_brand}</li>
                    <li>Dupe Shade Name: {match.dupe_shade_name}</li>
                    <li>Dupe Type: {match.dupe_type}</li>
                    <li>Dupe Price: ${match.dupe_price}</li>
                    <br />
                </div>
                )
        })

        return (
                    <LoggedInLayout>
                    <div><ul>{listOfMatches}</ul></div>
                    </LoggedInLayout>
            )
    }
}

module.exports = DisplayMatchesLoggedIn;