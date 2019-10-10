import React, { Component } from 'react';
import ErrorMessages from './ErrorMessages';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class UserSignUp extends Component {
    
    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        errors: [],
      }
    
      
    handleChange(event) {
        const newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);  
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        let errors = [];
        const { context } = this.props;
        
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
        } = this.state; 
        
        if (password === confirmPassword) {
            // New user payload
            const user = {
                firstName,
                lastName,
                emailAddress,
                password,
            };  
            errors = await this.props.context.data.createUser(user);
            if ( errors && errors.length) {
                this.setState({ errors });
                console.log(`${firstName} is successfully signed up and authenticated!`);// login
            }
        } else {
            errors.push("Passwords must match");
        }
            this.setState({ errors });
        
    }
    
    render () {
        return (
                <div className="bounds">
                <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
                <ErrorMessages errors={this.state.errors} />
                <div>
                    <form onSubmit={ event => this.handleSubmit(event) }>
                    <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" value={this.state.firstName} onChange={ (event) => this.handleChange(event) }/></div>
                    <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" value={this.state.lastName} onChange={ (event) => this.handleChange(event) } /></div>
                    <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={this.state.emailAddress} onChange={ (event) => this.handleChange(event) }/></div>
                    <div><input id="password" name="password" type="password" className="" placeholder="Password" value={this.state.password} onChange={ (event) => this.handleChange(event) }/></div>
                    <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password"
                        value={this.state.confirmpassword} onChange={ (event) => this.handleChange(event) } /></div>
                    <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><Link className="button button-secondary" to='/signIn'>Cancel</Link></div>
                    </form>
                </div>
                <p>&nbsp;</p>
                <p>Already have a user account? <Link to="/signIn">Click here</Link> to sign in!</p>
                </div>
            </div>
        );
    }   
}

export default UserSignUp;