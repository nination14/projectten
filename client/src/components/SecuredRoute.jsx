import React from 'react';
import { Consumer } from '../Context';
import { Route, Redirect } from 'react-router-dom'

export default function SecuredRoute({ component: Component, ...otherProps}) {
    
    return (
        <Consumer>
            { context => (
                <Route {...otherProps} render={ props => {
                    // If the user is logged in
                    return context && context.authorizedUser ?
                        // Render the component they asked for
                        <Component {...props}/>
                        // otherwise
                        : <Redirect to='/signIn' />   // Redirect them to login page
                }} />
            )}
        </Consumer>
    );
};