var React = require('react');
var AdminLayout = require('./layouts/adminLayout');

class NoProductLoggedInAsAdmin extends React.Component {
    render() {

        return (
                    <AdminLayout>
                    <div>
                        <h2>Sorry, the product '{this.props.product_shade_name}' does not exist in our database.</h2>
                        <p><a href="/dupes/new">Submit a new product (and its dupe)</a>.</p>
                    </div>
                    </AdminLayout>
            )
    }
}

module.exports = NoProductLoggedInAsAdmin;