var React = require('react');
var DefaultLayout = require('./layouts/defaultLayout');

class DisplayMatches extends React.Component {
    render() {

        const listOfMatches = this.props.matches.map( match => {
            return (
                <div>
                    <li>Product Brand: {match.product_brand}</li>
                    <li>Product Shade Name: {match.product_shade_name}</li>
                    <li>Product type: {match.product_type}</li>
                    <li>Product price: ${match.product_price}</li>

                    <br />

                    <li>Dupe Brand: {match.dupe_brand}</li>
                    <li>Dupe Shade Name: {match.dupe_shade_name}</li>
                    <li>Dupe type: {match.dupe_type}</li>
                    <li>Dupe price: ${match.dupe_price}</li>
                    <br />
                </div>
                )
        })

        return (
                    <DefaultLayout>
                    <div><ul>{listOfMatches}</ul></div>
                    </DefaultLayout>
            )
    }
}

module.exports = DisplayMatches;