var React = require('react');
var LoggedInLayout = require('./layouts/loggedInLayout');

class SubmitDupeLoggedIn extends React.Component {
    render() {


        return (

            <LoggedInLayout username={this.props.username}>

                <h2>Submit a dupe:</h2><br />

                <form method="POST" action="">

                    <div className="submitted-dupe-info">
                        <h3>Dupe info:</h3>
                        Dupe's shade name: <input name="submitted-dupe-shade-name" type="text" placeholder="..." style={{width: '50%'}}/><br />
                        Dupe's brand: <input name="submitted-dupe-brand" type="text" placeholder="KIKO, Colorpop, ..." style={{width: '50%'}}/><br />
                        Dupe's product type: <input name="submitted-dupe-type" type="text" placeholder="Soft Touch Blush, Ultra Matte Liquid Lipstick, ..." style={{width: '50%'}}/><br />
                        Dupe's price: $<input name="submitted-dupe-price" type="text" style={{width: '50%'}}/>
                    </div><br />

                    <div className="submitted-product-info">
                        <h3>Is a dupe of...</h3>
                        Product's shade name: <input name="submitted-product-shade-name" type="text" placeholder="..." style={{width: '50%'}}/><br />
                        Product's brand: <input name="submitted-product-brand" type="text" placeholder="Tom Ford Beauty, NARS, ..." style={{width: '50%'}}/><br />
                        Product type: <input name="submitted-product-type" type="text" placeholder="The Ultimate Bronzer, Powder Blush, ..." style={{width: '50%'}}/><br />
                        Product's price: $<input name="submitted-product-price" type="text" style={{width: '50%'}}/>
                    </div><br />

                    How similar is the dupe to the original product? <input name="similarity" type="text" />%
                    <select class="custom-select">
                      <option selected>Similarity</option>
                      <option value="1">85%</option>
                      <option value="2">90%</option>
                      <option value="3">95%</option>
                      <option value="4">100%</option>
                    </select>

                    <br />
                    <input name="submit" type="submit" />

                </form>

            </LoggedInLayout>

            )
    }
}

module.exports = SubmitDupeLoggedIn;