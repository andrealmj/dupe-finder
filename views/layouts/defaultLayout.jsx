var React = require("react");

class DefaultLayout extends React.Component {
  render() {
    return (
      <html>
        <head>
            <title>Dupe Finder</title>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"/>
        </head>

        <body>
          <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light p-0">
              <div className="collapse navbar-collapse" id="navbarSupportedContent">

              <ul className="navbar-nav ml-auto">

                <li><button type="button" className="btn btn-outline-success"><a href="/users/new" style={{color: 'green', textDecoration: 'none'}}>Register</a></button></li>
                <li><button type="button" className="btn btn-outline-success"><a href="/login" style={{color: 'green', textDecoration: 'none'}}>Log In</a></button></li>

              </ul>

              </div>

          </nav>
          <div className="m-3">
          <h1><a href="/" style={{textDecoration: 'none', color: 'black'}}>Welcome to Dupe Finder!</a></h1>

            <div className="searchbar text-center">
                <form className="form-inline my-lg-0" method="POST" action="/search/dupes/results">
                  <input name="search" className="form-control mr-sm-2 input-large search-query" style={{width: '80%'}} type="search" placeholder="Search for dupe by shade name..." aria-label="Search"/>
                  <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>

            {this.props.children}
          </div>
        </body>
      </html>
    );
  }
}

module.exports = DefaultLayout;