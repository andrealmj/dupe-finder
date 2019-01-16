var React = require('react');

class Home extends React.Component {
    render() {


        return (
            <html>
                <head>
                    <title>Dupe Finder</title>
                </head>

                <body>


                    <div className="topnav">
                        <button><a href="/users/new">Register</a></button>
                        <button><a href="/login">Log In</a></button>
                    </div>

                    <div className="searchbar">
                        <input type="text" placeholder="Search for dupe by shade name..." />
                    </div>


                </body>
            </html>
            )
    }
}

module.exports = Home;