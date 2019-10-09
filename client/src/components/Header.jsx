import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function Header(props) {

  return (
    <Fragment>
      <div className="header">
          <div className="bounds">
              <h1 className="header--logo">Super Nina's Super-Fun  { props.title }</h1>
              <nav>
                  <a className="signup" href="sign-up.html">Sign Up</a>
                  <Link className="signin" to="/signIn">Sign In</Link>
              </nav>
          </div>
      </div>
      <hr/>
    </Fragment>
  );
}

export default Header;