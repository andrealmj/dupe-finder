var React = require('react');
var LoggedInLayout = require('./layouts/loggedInLayout');

class DisplayMatchesLoggedIn extends React.Component {
    render() {

        const listOfMatches = this.props.matches.map( match => {
            return (
                <div className="container">
                    <div className="row border bg-light my-3 py-3">
                        <div className="col float-right">
                            <img src={match.product_swatch_link} style={{maxHeight: '180px'}}/><br />
                            <b>Praoduct Brand</b>: {match.product_brand}<br />
                            <b>Product Shade Name</b>: {match.product_shade_name}<br />
                            <b>Product Type</b>: {match.product_type}<br />
                            <b>Product Price</b>: ${match.product_price}<br />
                        </div>


                        <div className="col">
                            <img src={match.dupe_swatch_link} style={{maxHeight: '180px'}}/><br />
                            <b>Dupe Brand</b>: {match.dupe_brand}<br />
                            <b>Dupe Shade Name</b>: {match.dupe_shade_name}<br />
                            <b>Dupe Type</b>: {match.dupe_type}<br />
                            <b>Dupe Price</b>: ${match.dupe_price}<br />
                        </div>

                        <div className="col">
                            <b>Similarity</b>: {match.similarity}%
                        </div>

                    </div>

                </div>
                )
        })

        return (
                    <LoggedInLayout username={this.props.username}>
                    <div>{listOfMatches}</div>
                    </LoggedInLayout>
            )
    }
}

module.exports = DisplayMatchesLoggedIn;