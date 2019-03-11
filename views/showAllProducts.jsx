var React = require('react');
var AdminLayout = require('./layouts/adminLayout');

class ShowAll extends React.Component {
    render() {

        const listOfResults = this.props.results.map( result => {
            return (
                <div className="container">
                    <div className="row border bg-light my-3 py-3">

                        <div className="col">
                            <img src={result.product_swatch_link} style={{maxHeight: '180px'}}/><br />
                            <b>Product ID</b>: {result.product_id}<br />
                            <b>Product Brand</b>: {result.product_brand}<br />
                            <b>Product Shade Name</b>: {result.product_shade_name}<br />
                            <b>Product Type</b>: {result.product_type}<br />
                            <b>Product Price</b>: ${result.product_price}<br />

                            <br />
                        </div>

                        <div className="col">

                            <form method='GET' action={'/dupes/' + result.product_id + '/edit'}>
                                <input type='submit' value='Edit'/>
                            </form>

                            <form method="POST" action ={'/dupes/' + result.product_id + '/delete?_method=DELETE'}>
                                <input type="submit" value="Delete"/>
                            </form>


                        </div>

                    </div>

                </div>
                )
        })

        return (

                    <AdminLayout>
                    <div>{listOfResults}</div>
                    </AdminLayout>

            )
    }
}

module.exports = ShowAll;