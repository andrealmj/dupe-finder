var React = require("react");
var DefaultLayout = require('../layouts/defaultLayout');

class NewUser extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>

        <DefaultLayout>

            <h3>User created!</h3>

        </DefaultLayout>

        </body>
      </html>
    );
  }
}

module.exports = NewUser;
