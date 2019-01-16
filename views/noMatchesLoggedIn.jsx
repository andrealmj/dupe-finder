var React = require('react');
var LoggedInLayout = require('./layouts/loggedInLayout');

class NoMatchesLoggedIn extends React.Component {
    render() {

        return (
                    <LoggedInLayout>
                    <div>
                        <h1>Sorry, we could not find any dupes for this product in our database.</h1>
                        <p>Would you like to <a href="/dupes/new">submit a new dupe</a>?</p>
                    </div>
                    </LoggedInLayout>
            )
    }
}

module.exports = NoMatchesLoggedIn;