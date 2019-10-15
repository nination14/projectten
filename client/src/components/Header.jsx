import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';


function Header(props) {
  // const signInUserWithContext=  withContext(authorizedUser)
  // HW: Who the authorized user is , can we get this from context, 
  const { context } = props;
  let authorizedUser = null;

  if( context ){
    authorizedUser =context.authorizedUser;
    console.log(authorizedUser);
  }
  
  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo">Courses</h1>
        <nav>
          {authorizedUser ? (
            <React.Fragment>
              <span>Welcome, {authorizedUser.firstName}!</span>
              <Link className="signOut" to="/signout">Sign Out</Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link className="signup" to="/signup">Sign Up</Link>
              <Link className="signin" to="/signin">Sign In</Link>
            </React.Fragment>
          )}
        </nav>
      </div>
    </div>
  );



}

export default Header;