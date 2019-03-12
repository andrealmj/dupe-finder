var React = require('react');
var LoggedInLayout = require('./layouts/loggedInLayout');

class NoProductLoggedIn extends React.Component {
    render() {

        return (
                    <LoggedInLayout username={this.props.username}>
                    <div className="pb-4">
                        <p className="font-weight-normal" style={{fontSize: "24px"}}>Sorry, the product '{this.props.product_shade_name}' does not exist in our database.</p>
                        <p>Please click here to <a href="/dupes/new" style={{color: '#ddb3b3'}}>submit a new product (and its dupe)</a>.</p>
                    </div>
                    </LoggedInLayout>
            )
    }
}

module.exports = NoProductLoggedIn;