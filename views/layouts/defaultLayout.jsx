import React from 'react';

class DefaultLayout extends React.Component {
  render() {
    return (
      <html>
        <head>
            <title>Dupe Finder</title>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"/>

        </head>

        <body className="bg-light">
          <nav className="navbar sticky-top navbar-expand-lg navbar-light" style={{ backgroundColor: '#ddb3b3' }}>
              <a class="navbar-brand" href="/" style={{color: "white"}}>
                <img src="../../logo.png" width="30" height="30" class="d-inline-block align-top" alt="" />
                Dupe Finder
              </a>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">

              <ul className="navbar-nav ml-auto">

                <li><button type="button" className="btn mx-1" style={{backgroundColor: 'white'}}><a href="/users/new" style={{backgroundColor: 'white', color: '#ddb3b3', textDecoration: 'none'}}>Register</a></button></li>


                <li>
                    <div className="dropdown">
                      <a className="btn dropdown-toggle mx-1" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{backgroundColor: 'white', color: '#ddb3b3'}}>
                        Log In
                      </a>

                      <form className="dropdown-menu p-3 dropdown-menu-right" method="POST" action="/login"  style={{width: '400px', maxHeight: '200px'}}>

                          <div className="form-group row" style={{width: '500px', maxHeight: '200px'}}>
                                <label htmlFor="username2" className="col-sm-2 col-form-label">Username</label>
                            <div className="col-sm-8 text-center">
                                <input type="text" name="username" className="form-control" id="username2" style={{maxWidth: '250px'}} />
                            </div>
                          </div>

                          <div className="form-group row" style={{width: '500px', maxHeight: '200px'}}>
                                <label htmlFor="exampleDropdownFormPassword2" className="col-sm-2 col-form-label">Password</label>
                            <div className="col-sm-8 text-center">
                                <input type="password" name="password" className="form-control" id="exampleDropdownFormPassword2" style={{maxWidth: '250px', outline: 'none'}} />
                            </div>
                          </div>

                          <div className="form-group row" style={{width: '440px', maxHeight: '200px'}}>
                            <div className="col-sm-10">
                                <button type="submit" className="btn" style={{float: 'right', backgroundColor: '#ddb3b3'}}><a href="/login" style={{color: 'white', textDecoration: 'none'}}>Log in</a></button>
                            </div>
                          </div>

                      </form>
                    </div>
                </li>


              </ul>
              </div>
          </nav>


          <div class="jumbotron bg-white">
            <h1 class="display-4">Welcome to Dupe Finder!</h1>
            <p class="lead">A makeup dupe is a similarly-colored (and often similar in finish) shade compared to the "original shade."<br /> It might be cheaper than the original, better-performing, permanently available, or by a brand more available to you in your area.</p>
            
            <hr class="my-4" />

            <div className="searchbar py-3">
              <form className="form-inline my-2 my-lg-0" method="POST" action="/search/dupes/results">
                <input name="search" className="form-control input-large search-query mr-2" style={{ width: '40%' }} type="search" placeholder="Search for dupe by product shade name..." aria-label="Search" />
                <button className="btn my-sm-0" type="submit" style={{ backgroundColor: '#ddb3b3', color: 'white' }}>Search</button>
              </form>
            </div>
          </div>

          <div className="m-3 pb-4">
            {this.props.children}
          </div>

          <div class="navbar fixed-bottom" style={{ backgroundColor: '#ddb3b3' }}>
            <span style={{fontSize: '16px', float: 'left', color: 'white'}}>Like what you see? Hire me!</span>
            <span class="float-right" style={{color: 'white'}}><a href="https://github.com/andrealmj" target="_blank" style={{color: 'white'}}>GitHub</a> | <a href="https://www.linkedin.com/in/andrea-mj-lim/" target="_blank"  style={{color: 'white'}}>LinkedIn</a> | <a href="mailto: andrea.mj.lim@gmail.com?Subject=Andrea, we want to hire you!" style={{color: 'white'}}>E-Mail</a></span>
          </div>
                    

          <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossOrigin="anonymous"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossOrigin="anonymous"></script>

        </body>
      </html>
    );
  }
}

module.exports = DefaultLayout;