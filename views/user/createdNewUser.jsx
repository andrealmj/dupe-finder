var React = require("react");
var DefaultLayout = require('../layouts/defaultLayout');

class NewUser extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>

        <DefaultLayout>

            <p className="font-weight-normal" style={{fontSize: "24px"}}>User created!</p>

        </DefaultLayout>

        </body>
      </html>
    );
  }
}

module.exports = NewUser;
