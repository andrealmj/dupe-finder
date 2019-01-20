var React = require('react');
var LoggedInLayout = require('./layouts/loggedInLayout');

class NoProductLoggedIn extends React.Component {
    render() {

        return (
                    <LoggedInLayout username={this.props.username}>
                    <div>
                        <h2>Sorry, the product '{this.props.product_shade_name}' does not exist in our database.</h2>
                        <p>Please click here to <a href="/dupes/new">submit a new product (and its dupe)</a>.</p>
                    </div>
                    </LoggedInLayout>
            )
    }
}

module.exports = NoProductLoggedIn;