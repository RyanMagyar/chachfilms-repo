import React from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';

class Login extends React.Component{

    constructor(props){
        super(props);
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        this.state = {username: '', password: '', message: '', isLoggedIn: userToken};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        const { password } = this.state;
        const { username } = this.state;
        const loginUrl = "/api/v1/login/";


        fetch(loginUrl, {
            credentials: 'same-origin',
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
        })
            .then((response) => {
                if (!response.ok) {
                    response.json().then((data) => {
                        this.setState({message: data.message})
                    })
                    throw Error(response.statusText);
                    
                }
                return response.json();
            })
            .then((data) => {
                localStorage.setItem('token', JSON.stringify(data.access_token));
                localStorage.setItem('username', this.state.username);
                this.setState({isLoggedIn: data.access_token});
                this.props.rerenderHeader();
            })
            .catch((error) => console.log(error))

            event.preventDefault();

    }

    render(){
        const { message } = this.state;
        if(this.state.isLoggedIn){
            return(<Redirect to="/"/>);
        }else {
            return(
                <div className="login-wrapper">
                    <h1 className="loginError">{message}</h1>
                    <h1 className="loginHeading">Please Log In</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="loginLabel">
                        <label>
                            <p>Username</p>
                            <input className="loginInput" type="text" onChange={e => this.setState({username: e.target.value})} />
                        </label>
                        </div>
                        <div className="loginLabel">
                        <label>
                            <p>Password</p>
                            <input className="loginInput" type="password" onChange={e => this.setState({password: e.target.value})} />
                        </label>
                        </div>
                        <div>
                            <button className="loginButton" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            );
        }
    }
};

export default Login;