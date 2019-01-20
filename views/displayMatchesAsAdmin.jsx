var React = require('react');
var AdminLayout = require('./layouts/adminLayout');

class DisplayMatchesAsAdmin extends React.Component {
    render() {

        const listOfMatches = this.props.matches.map( match => {
            return (
                <div className="container">
                    <div className="row border border-success my-3 py-3">
                        <div className="col">
                            <li>Product Brand: {match.product_brand}</li>
                            <li>Product Shade Name: {match.product_shade_name}</li>
                            <li>Product Type: {match.product_type}</li>
                            <li>Product Price: ${match.product_price}</li>
                        </div>


                        <div className="col">
                            <li>Dupe Brand: {match.dupe_brand}</li>
                            <li>Dupe Shade Name: {match.dupe_shade_name}</li>
                            <li>Dupe Type: {match.dupe_type}</li>
                            <li>Dupe Price: ${match.dupe_price}</li>
                        </div>

                        <div className="col">
                            <button type="button" class="btn btn-outline-primary mb-1">Edit</button> <br />
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                            Launch demo modal
                            </button>
                            <button type="button" class="btn btn-outline-danger">Delete</button>
                        </div>

                    </div>

                </div>
                )
        })
        return (
                    <AdminLayout>
                    <div><ul>{listOfMatches}</ul></div>
                    </AdminLayout>
            )
    }
}

module.exports = DisplayMatchesAsAdmin;