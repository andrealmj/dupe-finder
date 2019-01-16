var React = require('react');
var DefaultLayout = require('./layouts/defaultLayout');

class NoMatches extends React.Component {
    render() {

        return (
                    <DefaultLayout>
                    <div>
                        <h1>Sorry, this product is not in our database.</h1>
                        <p>Would you like to <a href="/dupes/new">submit a new product</a>?</p>
                    </div>
                    </DefaultLayout>
            )
    }
}

module.exports = NoMatches;