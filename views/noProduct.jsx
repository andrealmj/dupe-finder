var React = require('react');
var DefaultLayout = require('./layouts/defaultLayout');

class NoProducts extends React.Component {
    render() {

        return (
                    <DefaultLayout>
                    <div>
                        <h2>Sorry, the product '{this.props.product_shade_name}' does not exist in our database.</h2>
                        <p>Please log in to <a href="/dupes/new">submit a new product (and its dupe)</a>.</p>
                    </div>
                    </DefaultLayout>
            )
    }
}

module.exports = NoProducts;