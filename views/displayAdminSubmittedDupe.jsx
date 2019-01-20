var React = require('react');
var AdminLayout = require('./layouts/adminLayout');

class DisplayAdminSubmittedDupe extends React.Component {
    render() {

        const submittedInformation = this.props.values.map ( value => {
            return (
                <div>
                    <li>Product Brand: {value.product_brand}</li>
                    <li>Product Shade Name: {value.product_shade_name}</li>
                    <li>Product Type: {value.product_type}</li>
                    <li>Product Price: ${value.product_price}</li>

                    <br />

                    <li>Dupe Brand: {value.dupe_brand}</li>
                    <li>Dupe Shade Name: {value.dupe_shade_name}</li>
                    <li>Dupe Type: {value.dupe_type}</li>
                    <li>Dupe Price: ${value.dupe_price}</li>
                    <br />
                </div>
                )
        })


        return (

            <AdminLayout>

                <p>Your submission is now in the database.</p>
                <p><a href="#">Display all existing product / dupe relationships in database</a></p>
                <p>(allow edits / delete from that page)</p>

            </AdminLayout>

            )
    }
}

module.exports = DisplayAdminSubmittedDupe;