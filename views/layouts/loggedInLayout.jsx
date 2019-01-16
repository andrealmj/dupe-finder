var React = require("react");

class LoggedInLayout extends React.Component {
  render() {
    return (
      <html>
        <head>
            <title>Dupe Finder</title>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"/>
        </head>

        <body>
          <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <button type="button" className="btn btn-outline-success" style={{float: 'right'}}>@{this.props.user}</button>
                <button type="button" className="btn btn-outline-success" style={{float: 'right'}}><a href="/logout" style={{color: 'green', textDecoration: 'none'}}>Log Out</a></button>
              </div>
          </nav>

            <div className="searchbar text-center">
                <form className="form-inline m-3 my-lg-0">
                  <input className="form-control mr-sm-2 input-large search-query" style={{width: '80%'}} type="search" placeholder="Search for dupe by shade name..." aria-label="Search"/>
                  <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>

            {this.props.children}
        </body>
      </html>
    );
  }
}

module.exports = LoggedInLayout;