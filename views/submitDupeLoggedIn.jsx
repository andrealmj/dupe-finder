var React = require('react');
var LoggedInLayout = require('./layouts/loggedInLayout');

class SubmitDupeLoggedIn extends React.Component {
    render() {


        return (

            <LoggedInLayout username={this.props.username}>

                <p className="font-weight-normal" style={{fontSize: "24px"}}>Submit a dupe:</p><hr />

                <form method="POST" action="" autoComplete="on" className="pb-4">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <p className="font-weight-normal" style={{ fontSize: '20px' }}>Dupe information<br /></p>

                            <label for="dupeImg">Select Dupe Image</label><br />
                            <input id="dupeImg" type="file" />
                            <br /><br />

                            <label for="dupeShadeName">Dupe's Shade Name</label>                            
                            <input name="submittedDupeShadeName" type="text" class="form-control" id="dupeShadeName" placeholder="..." style={{width: '60%'}} />
                            <small id="help" class="form-text text-muted">This should be the less expensive item.</small>
                            <br />

                            <label for="dupeBrand">Dupe's Brand</label>                            
                            <input name="submittedDupeBrand" type="text" class="form-control" id="dupeBrand" placeholder="KIKO, Colourpop, ..." style={{width: '60%'}} />
                            <br />

                            <label for="dupeType">Dupe's Product Type</label>                            
                            <input name="submittedDupeType" type="text" class="form-control" id="dupeType" placeholder="Soft Touch Blush, Ultra Matte Liquid Lipstick, ..." style={{width: '60%'}} />
                            <br />

                            <label for="dupePrice">Dupe's Price ($)</label>                            
                            <input name="submittedDupePrice" type="text" class="form-control" id="dupePrice" style={{width: '60%'}} />
                            
                        </div>

                        <div class="form-group col-md-6">
                            <p className="font-weight-normal" style={{ fontSize: '20px' }}>Product information</p>

                            <label for="pdtImg">Select Product Image</label><br />
                            <input id="pdtImg" type="file" />
                            <br /><br />
                            
                            <label for="pdtShadeName">Product's Shade Name</label>
                            <input name="submittedPdtShadeName" type="text" class="form-control" id="pdtShadeName" placeholder="..." style={{width: '60%'}} />
                            <small id="help" class="form-text text-muted">This should be the more expensive item.</small>
                            <br />
                            
                            <label for="pdtBrand">Product's Brand</label>                            
                            <input name="submittedPdtBrand" type="text" class="form-control" id="pdtBrand" placeholder="Tom Ford Beauty, NARS, ..." style={{width: '60%'}} />
                            <br />

                            <label for="pdtType">Product's Type</label>                            
                            <input name="submittedPdtType" type="text" class="form-control" id="pdtType" placeholder="The Ultimate Bronzer, Powder Blush, ..." style={{width: '60%'}} />
                            <br />

                            <label for="pdtPrice">Product's Price ($)</label>                            
                            <input name="submittedPdtPrice" type="text" class="form-control" id="pdtPrice" style={{width: '60%'}} />
                            
                        </div>

                        <div class="form-group col-md-6">
                            <label for="similarity">How similar (%) is the dupe to the original product?</label>
                            <input name="similarity" type="text" class="form-control" id="similarity" style={{width: '50%'}} />
                        </div>
                    </div>

                    <button type="submit" class="btn" style={{ backgroundColor: '#ddb3b3', color: 'white' }}>Submit Dupe</button>
                </form>

            </LoggedInLayout>

            )
    }
}

module.exports = SubmitDupeLoggedIn;