import React, { Fragment } from 'react';

function Header(props) {

  return (
    <Fragment>
      <div className="header">
          <div className="bounds">
              <h1 className="header--logo">Super Nina's Super-Fun  { props.title }</h1>
              <nav>
                  <a className="signup" href="sign-up.html">Sign Up</a>
                  <a className="signin" href="sign-in.html">Sign In</a>
              </nav>
          </div>
      </div>
      <hr/>
    </Fragment>
  );
}

export default Header;