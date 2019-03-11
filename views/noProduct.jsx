var React = require('react');
var DefaultLayout = require('./layouts/defaultLayout');

class NoProducts extends React.Component {
    render() {

        return (
                    <DefaultLayout>
                    <div className="pb-4">
                        <p className="font-weight-normal" style={{fontSize: "24px"}}>Sorry, the product '{this.props.product_shade_name}' does not exist in our database.</p>
                        <p>Please log in to submit a new product (and its dupe).</p>
                    </div>
                    </DefaultLayout>
            )
    }
}

module.exports = NoProducts;