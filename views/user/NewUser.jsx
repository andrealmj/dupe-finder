var React = require("react");
var DefaultLayout = require('../layouts/defaultLayout');

class NewUser extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>

        <DefaultLayout>
            <p className="font-weight-normal" style={{fontSize: "24px"}}>Register as a new user</p>
            <hr />

            <form className="user-form pb-4" method="POST" action="/users">
              <div class="form-group">
                <label for="exampleInputEmail1">Username</label>
                <input name="username" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" style={{width: '20%'}}/>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input name="password" type="password" class="form-control" id="exampleInputPassword1" style={{width: '20%'}}/>
              </div>
                  
              <button type="submit" class="btn" style={{ backgroundColor: '#ddb3b3', color: 'white' }}>Register</button>
            </form>

        </DefaultLayout>

        </body>
      </html>
    );
  }
}

module.exports = NewUser;
