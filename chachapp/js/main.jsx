import React from 'react';
import Movies from './movies';
import Header from './header';
import Home from './home';
import Login from './login';
import AddMovie from './addmovie';


import { Route, Link, Redirect } from 'react-router-dom';
import "../static/css/style.css";


class Main extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            toggleHeaderRerender: false, toggleHomeRerender: false,
        };

        this.rerenderHeader = this.rerenderHeader.bind(this);
        this.rerenderHome = this.rerenderHome.bind(this);

    }

    rerenderHeader() {
        this.setState({toggleHeaderRerender: !this.state.toggleHeaderRerender});
    }

    rerenderHome() {
        this.setState({toggleHomeRerender: !this.state.toggleHomeRerender});
    }

    render(){
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return(
            <div>
                <Header toggleHeaderRerender={this.state.toggleHeaderRerender} 
                rerenderHome={this.rerenderHome}/>
                <Route exact path="/movies/" component={Movies}/>
                <Route exact path="/reviewers/" component={Movies}/>
                <Route exact path="/addmovie/" render={() => (
                    userToken ? (<AddMovie/>
                    ) :(
                        <Redirect to='/login/'/>
                    )
                )}/>
                <Route exact path="/login/" render={(props) => (<Login rerenderHeader={this.rerenderHeader}/>)}/> 
                <Route exact path="/" render={(props) => (<Home toggleHomeRerender={this.state.toggleHomeRerender}/>)}/>
            </div>
        );
    }
        
};


export default Main;