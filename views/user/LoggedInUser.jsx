var React = require('react');

class LoggedInUser extends React.Component {
    render() {


        return (
            <html>
                <head>
                    <title>Dupe Finder</title>
                </head>

                <body>
                    <h3>Welcome, @{this.props.user}!</h3><br />

                    <div className="topnav">
                        <button><a href="/dupes/new">Submit A Dupe</a></button>
                        <button><a href="/logout">Log Out</a></button>
                    </div>

                    <div className="searchbar">
                        <input type="text" placeholder="Search for dupe by shade name..." />
                    </div>

                </body>
            </html>
            )
    }
}

module.exports = LoggedInUser;