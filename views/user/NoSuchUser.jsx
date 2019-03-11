var React = require("react");
var DefaultLayout = require('../layouts/defaultLayout');

class NewUser extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>

        <DefaultLayout>

            <div className="pb-4">
                <p className="font-weight-normal" style={{fontSize: "24px"}}>User doesn't exist!</p>
                <p><a href="/users/new" style={{color: '#ddb3b3'}}>Register</a> an account?</p>
            </div>
            
        </DefaultLayout>

        </body>
      </html>
    );
  }
}

module.exports = NewUser;
