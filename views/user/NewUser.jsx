var React = require("react");
var DefaultLayout = require('../layouts/defaultLayout');

class NewUser extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>

        <DefaultLayout>
            <h3>Register as a new user:</h3>

              <form className="user-form" method="POST" action="/users">
                <div className="user-attribute">
                  Username:<input name="username" type="text" />
                </div>
                <div className="user-attribute">
                  Password:<input name="password" type="text" />
                </div>
                <input name="submit" type="submit" />
              </form>

        </DefaultLayout>

        </body>
      </html>
    );
  }
}

module.exports = NewUser;
