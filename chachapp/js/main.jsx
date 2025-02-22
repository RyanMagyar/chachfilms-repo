import React from 'react';
import Watched from './watched';
import Header from './header';
import Home from './home';
import Login from './login';
import AddMovie from './addmovie';
import Profile from './profile';
import Reviewers from './reviewers';
import MoviePage from './moviePage';
import Statistics from './statistics';

import jwt_decode from "jwt-decode";
import { Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../static/css/style.css";


class Main extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            toggleHeaderRerender: false, toggleHomeRerender: false,
            numInRotation: {}
        };
        this.getUsers();
        this.rerenderHeader = this.rerenderHeader.bind(this);
        this.rerenderHome = this.rerenderHome.bind(this);
        this.getNumInRotation = this.getNumInRotation.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

    }

    rerenderHeader() {
        this.setState({toggleHeaderRerender: !this.state.toggleHeaderRerender});
    }

    rerenderHome() {
        this.setState({toggleHomeRerender: !this.state.toggleHomeRerender});
    }

    handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.rerenderHome();
    }
    getUsers(){

        var numInRotation = {};
        fetch("/api/v1/accounts/users/")
        .then((response) => {
            if (!response.ok) throw Error(response.statusText);
            
            return response.json();
        })
        .then((data) => {
            var users = data.users;
            users.forEach(user => numInRotation[user.username] = -1);
            this.setState({numInRotation: numInRotation});
        })
        .catch((error) => console.log(error));
    }

    getNumInRotation(movies, url) {
        const { numInRotation } = this.state;

        if(url == "/api/v1/watched/" && numInRotation[Object.keys(numInRotation)[0]] == -1){
            var inRotationMovies = [];
            fetch("/api/v1/inrotation/")
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                
                return response.json();
            })
            .then((data) => {
                inRotationMovies = data.movies;
                for(var person in numInRotation){
                    numInRotation[person] = 0;
                }
                inRotationMovies.forEach(movie => numInRotation[movie.suggestedby] = numInRotation[movie.suggestedby] + 1);    
            })
            .catch((error) => console.log(error));
        }
        else if(url == "/api/v1/inrotation/"){
            for(var person in numInRotation){
                numInRotation[person] = 0;
            }
            movies.forEach(movie => numInRotation[movie.suggestedby] = numInRotation[movie.suggestedby] + 1);    
        }

        
        this.setState({numInRotation: numInRotation});
    }

    render(){
        const tokenString = localStorage.getItem('token');
        let currentDate = new Date();
        let decodedToken = {};
        let tokenValid = false;
        if (tokenString !== null){
            decodedToken = jwt_decode(tokenString);
            //console.log("Dedcoded Token", decodedToken);
            if (tokenString && decodedToken.exp * 1000 < currentDate.getTime()) {
             //   console.log("Token expired");
                tokenValid = false;
            } else {
              //  console.log("Valid token");
                tokenValid = true;
            }
        }
        const userToken = JSON.parse(tokenString);
        return(
            <div>
                <Header toggleHeaderRerender={this.state.toggleHeaderRerender} 
                rerenderHome={this.rerenderHome} handleLogout={this.handleLogout}/>
                <Route exact path="/watched/" render={(props) => (<Watched getNumInRotation={this.getNumInRotation}
                numInRotation={this.state.numInRotation}/>)}/>
                <Route exact path="/reviewers/" component={Reviewers}/>
                <Route exact path="/statistics/" render={(props) => (<Statistics numInRotation={this.state.numInRotation}/>)}/>
                <Route exact path="/addmovie/" render={() => (
                    tokenValid ? (<AddMovie/>
                    ) :(
                        <Redirect to='/login/'/>
                    )
                )}/>
                <Route exact path="/profile/" render={() => (
                    tokenValid ? (<Profile/>
                    ) :(
                        <Redirect to='/login/'/>
                    )
                )}/>
                <Route exact path="/login/" render={(props) => (<Login tokenValid={tokenValid} rerenderHeader={this.rerenderHeader}/>)}/> 
                <Route exact path="/m/:movieid/" render={(props) => (<MoviePage {...props} getNumInRotation={this.getNumInRotation}
                 numInRotation={this.state.numInRotation}/>)}/> 
                <Route exact path="/" render={(props) => (<Home {...props} getNumInRotation={this.getNumInRotation}
                numInRotation={this.state.numInRotation} toggleHomeRerender={this.state.toggleHomeRerender}/>)}/>
                <Route render={() => <Redirect to='/' />} />
            </div>
        );
    }
        
};


export default Main;
