var React = require("react");
var DefaultLayout = require('../layouts/defaultLayout');

class IncorrectPassword extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>

        <DefaultLayout>

            <div className="pb-4">
                <p className="font-weight-normal" style={{fontSize: "24px"}}>Incorrect password!</p>
                <p>Please try again.</p>
            </div>
            
        </DefaultLayout>

        </body>
      </html>
    );
  }
}

module.exports = IncorrectPassword;
