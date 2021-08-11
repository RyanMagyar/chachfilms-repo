import React from 'react';
import Watched from './watched';
import Header from './header';
import Home from './home';
import Login from './login';
import AddMovie from './addmovie';
import Downloads from './downloads';
import Profile from './profile';
import Reviewers from './reviewers';
import MoviePage from './moviePage';


import { Route, Link, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../static/css/style.css";


class Main extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            toggleHeaderRerender: false, toggleHomeRerender: false,
            numInRotation: {'Ryan': -1,
            'Justin': -1, 'Marcus': -1, 'Jon': -1}
        };

        this.rerenderHeader = this.rerenderHeader.bind(this);
        this.rerenderHome = this.rerenderHome.bind(this);
        this.getNumInRotation = this.getNumInRotation.bind(this);

    }

    rerenderHeader() {
        this.setState({toggleHeaderRerender: !this.state.toggleHeaderRerender});
    }

    rerenderHome() {
        this.setState({toggleHomeRerender: !this.state.toggleHomeRerender});
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
        const userToken = JSON.parse(tokenString);
        return(
            <div>
                <Header toggleHeaderRerender={this.state.toggleHeaderRerender} 
                rerenderHome={this.rerenderHome}/>
                <Route exact path="/watched/" render={(props) => (<Watched getNumInRotation={this.getNumInRotation}
                numInRotation={this.state.numInRotation}/>)}/>
                <Route exact path="/reviewers/" component={Reviewers}/>
                <Route exact path="/addmovie/" render={() => (
                    userToken ? (<AddMovie/>
                    ) :(
                        <Redirect to='/login/'/>
                    )
                )}/>
                <Route exact path="/downloads/" render={() => (
                    userToken ? (<Downloads/>
                    ) :(
                        <Redirect to='/login/'/>
                    )
                )}/>
                <Route exact path="/profile/" render={() => (
                    userToken ? (<Profile/>
                    ) :(
                        <Redirect to='/login/'/>
                    )
                )}/>
                <Route exact path="/login/" render={(props) => (<Login rerenderHeader={this.rerenderHeader}/>)}/> 
                <Route exact path="/m/:movieid/" component={MoviePage}/> 
                <Route exact path="/" render={(props) => (<Home getNumInRotation={this.getNumInRotation}
                numInRotation={this.state.numInRotation} toggleHomeRerender={this.state.toggleHomeRerender}/>)}/>
                <Route render={() => <Redirect to='/' />} />
            </div>
        );
    }
        
};


export default Main;