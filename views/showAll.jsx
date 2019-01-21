var React = require('react');
var AdminLayout = require('./layouts/adminLayout');

class ShowAll extends React.Component {
    render() {

        const listOfResults = this.props.results.map( result => {
            return (
                <div className="container">
                    <div className="row border border-success my-3 py-3">

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
                        </div>

                        <div className="col">
                            <p>RS id: {result.rs_id}</p>

                            <button type="button" className="btn btn-outline-primary mb-1">Edit</button> <br />
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                            Edit MODAL
                            </button>



                            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Edit product / dupe relationship</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div className="modal-body">
                                    INSERT EDIT FORM HERE
                                  </div>
                                  <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Save changes</button>
                                  </div>
                                </div>
                              </div>
                            </div>


                            <form method='GET' action={'/dupes/' + result.rs_id + '/edit'}>
                                <input type='submit' value='Edit'/>
                            </form>

                            <form method="POST" action ={'/dupes/' + result.rs_id + '/delete?_method=DELETE'}>
                                <input type="submit" value="Delete"/>
                            </form>

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