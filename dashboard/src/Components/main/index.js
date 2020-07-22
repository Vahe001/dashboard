import { login } from './helpers'
import Cars from './../Cars/index'
import cssClasses from './style.css'
import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { Route, Redirect } from 'react-router-dom'
export default class Main extends Component {
    constructor() {
        super();
        let token = localStorage.getItem('token')
        this.state = {
            errorMessage: '',
            redirect: token? '/cars': null
        }
    }

     async googleSignIn(responce) {
        try {
            if(responce.error)
                return this.setState({errorMessage: 'Error: Please try again'})
            const idToken = responce.getAuthResponse().id_token;
            await login(idToken)
            this.setState({redirect: '/cars'})
        } catch (err) {
            console.error("error: ", err)
            this.setState({errorMessage: 'Error: Please try again'})
        }
    }

    render() {
        if (this.state.redirect) {
            return (
                <div>
                    <Redirect to={this.state.redirect} />
                    <Route path="/cars" component ={Cars}/>
                </div>
            )
        }
        return (
            <div className={cssClasses.MainStyle}>
                <GoogleLogin
                    clientId={process.env.REACT_APP_CLIENT_ID}
                    buttonText="Login"
                    onSuccess={this.googleSignIn.bind(this)}
                    onFailure={this.googleSignIn.bind(this)}
                    cookiePolicy={'single_host_origin'}
                    className={cssClasses.button}
                />
                <div className={cssClasses.errorMessage}>{this.state.errorMessage}</div>
            </div>
        )
    }
}
