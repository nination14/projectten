import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

const Context = React.createContext();

export class Provider extends Component {
    constructor() {
        super();
        this.data = new Data();
        
    }
    state = {
        authorizedUser:Cookies.getJSON('authorizedUser') || null   
    }
    
    /**
     * Returns the user if sign in was successful. Otherwise, returns null
     * @param {*} email 
     * @param {*} password 
     */
    async signIn(email,password) {
        const user = await this.data.getUser(email, password);
        if (user) user.password = password;
        Cookies.set('authorizedUser', JSON.stringify(user));
        this.setState({ authorizedUser: user });
        return user;
    }

    signOut() {
        this.setState({ authorizedUser: null });
        Cookies.remove('authorizedUser'); 
        
    }

    render() {
        const value = {
            data: this.data,
            authorizedUser: this.state.authorizedUser,
            signIn: (email, password) => this.signIn(email, password)
        };
        return (
            <Context.Provider value={ value }>
                {this.props.children}
            </Context.Provider>
        ); 
    }
}

export const Consumer = Context.Consumer;

export default function withContext(Component) {
    return function ContextComponent(props) {
        return (
            <Context.Consumer>
                { context => <Component {...props} context={context} /> }
            </Context.Consumer>
        );
    }
}