var React = require('react');
var AdminLayout = require('./layouts/adminLayout');

class NoProductLoggedInAsAdmin extends React.Component {
    render() {

        return (
                    <AdminLayout>
                    <div className="pb-4">
                        <p className="font-weight-normal" style={{fontSize: '24px'}}>Sorry, the product '{this.props.product_shade_name}' does not exist in our database.</p>
                        <p><a href="/dupes/new" style={{color: '#ddb3b3'}}>Submit a new product (and its dupe)</a>.</p>
                    </div>
                    </AdminLayout>
            )
    }
}

module.exports = NoProductLoggedInAsAdmin;