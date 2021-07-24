import React from 'react';
import Movies from './movies';
import Header from './header';
import Home from './home';
import Login from './login';


import { Route, Link } from 'react-router-dom';
import "../static/css/style.css";


class Main extends React.Component{

    render(){
        return(
            <div>
                <Header/>
                <Route exact path="/movies/" component={Movies}/>
                <Route exact path="/reviewers/" component={Movies}/>
                <Route exact path="/addmovie/" component={Movies}/>
                <Route exact path="/login/" component={Login}/>
                <Route exact path="/" component={Home}/>


            </div>
        );
    }
        
};


export default Main;