import React, { Component } from 'react';
import ErrorMessages from './ErrorMessages';
import { Link } from 'react-router-dom';

class UserSignIn extends Component {

    state = {
        emailAddress: '',
        password: '',
        errors: []
    }

    handleChange(event) {
        const newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const user = await this.props.context.signIn(this.state.emailAddress, this.state.password);
        if (user) {
            const path="/";
            this.props.history.push(path);
        } else {
            this.setState({
                errors: ["Username and/or password is incorrect"]
            })
        }
    }

    render() {
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                <h1>Sign In</h1>
                <ErrorMessages title="Login Failed" errors={this.state.errors} />
                <div>
                    <form onSubmit={ event => this.handleSubmit(event) }>
                    <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={this.state.emailAddress} onChange={ (event) => this.handleChange(event) }/></div>
                    <div><input id="password" name="password" type="password" className="" placeholder="Password" value={this.state.password} onChange={ (event) => this.handleChange(event)}/></div>
                    <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button><Link className="button button-secondary" to="/">Cancel</Link></div>
                    </form>
                </div>
                <p>&nbsp;</p>
                <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
                </div>
            </div>
        );
    }
}

export default UserSignIn; 