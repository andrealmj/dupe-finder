var React = require('react');

class LoginPage extends React.Component {
    render() {

        return (
            <html>
                <head>
                    <title>Log In</title>
                </head>

                <body>

                <h1>Log in here</h1>
                <form className="user-form" method="POST" action="">
                    <div className="user-attribute">
                        <input name="username" type="text" placeholder="username" />
                    </div>
                    <div className="user-attribute">
                        <input name="password" type="text" placeholder="password" />
                    </div>
                    <input name="submit" type="submit" />
                </form>

                </body>
            </html>

            )
    }
}

module.exports = LoginPage;