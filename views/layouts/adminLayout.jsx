var React = require("react");

class AdminLayout extends React.Component {
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

              <ul className="navbar-nav ml-auto">

                <li><button type="button" className="btn btn-outline-success">admin</button></li>
                <li><button type="button" className="btn btn-outline-success"><a href="/logout" style={{color: 'green', textDecoration: 'none'}}>Log Out</a></button></li>
                <li><button type="button" className="btn btn-outline-success"><a href="/dupes/new" style={{color: 'green', textDecoration: 'none'}}>Submit A Dupe</a></button></li>

              </ul>
              </div>
          </nav>

          <div className="m-3">
          <h1><a href="/" style={{textDecoration: 'none', color: 'black'}}>You are now logged in as an admin.</a></h1>

            <div className="searchbar text-center pb-3">
                <form className="form-inline my-lg-0" method="POST" action="/search/dupes/results">
                  <input name="search" className="form-control mr-sm-2 input-large search-query" style={{width: '80%'}} type="search" placeholder="Search for dupe by shade name..." aria-label="Search"/>
                  <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>

            <h3><a href="/view/all">View all product/dupe relationships</a></h3>
            <h3>add an UPDATE (edit) route</h3>

            {this.props.children}
          </div>

          <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossOrigin="anonymous"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossOrigin="anonymous"></script>


        </body>
      </html>
    );
  }
}

module.exports = AdminLayout;