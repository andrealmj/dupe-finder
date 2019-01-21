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
                            <p>RS id: {match.rs_id}</p>

                            <button type="button" class="btn btn-outline-primary mb-1">Edit</button> <br />
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                            Edit MODAL
                            </button>



                            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Edit product / dupe relationship</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div class="modal-body">
                                    INSERT EDIT FORM HERE
                                  </div>
                                  <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary">Save changes</button>
                                  </div>
                                </div>
                              </div>
                            </div>




                            <button type="button" class="btn btn-danger delete-rs"><a href="/delete/dupes/:id">Delete</a></button>
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