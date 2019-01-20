var React = require('react');
var AdminLayout = require('./layouts/adminLayout');

class ShowAll extends React.Component {
    render() {

        const listOfResults = this.props.results.map( result => {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <li>Product Brand: {result.product_brand}</li>
                            <li>Product Shade Name: {result.product_shade_name}</li>
                            <li>Product Type: {result.product_type}</li>
                            <li>Product Price: ${result.product_price}</li>

                            <br />
                        </div>


                        <div className="col">
                            <li>Dupe Brand: {result.dupe_brand}</li>
                            <li>Dupe Shade Name: {result.dupe_shade_name}</li>
                            <li>Dupe Type: {result.dupe_type}</li>
                            <li>Dupe Price: ${result.dupe_price}</li>

                            <br />
                        </div>

                    </div>

                </div>
                )
        })

        return (

                    <AdminLayout>
                    <div><ul>{listOfResults}</ul></div>
                    </AdminLayout>

            )
    }
}

module.exports = ShowAll;