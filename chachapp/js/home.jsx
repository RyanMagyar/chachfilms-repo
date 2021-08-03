import React from "react";
import Feed from './feed';
import { DropdownButton } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { Button } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends React.Component {

    constructor(props) {
        super(props);
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        this.state = {
            lastWatched: 'Picked Last', rolledMovie: 'Please select last person to pick!', isLoggedIn: userToken,
            toggleRerender: false,  toggleHomeRerender: this.props.toggleHomeRerender,
        };
        this.handleClick = this.handleClick.bind(this);
        this.rerenderParent = this.rerenderParent.bind(this);

    }

    rerenderParent() {
        this.setState({toggleRerender: !this.state.toggleRerender});
    }

    

    componentDidUpdate(previousProps){
        if(previousProps.toggleHomeRerender != this.props.toggleHomeRerender){
            const tokenString = localStorage.getItem('token');
            const userToken = JSON.parse(tokenString);
            this.setState({isLoggedIn: userToken});
        }

    }

    componentDidMount() {
        const { url } = "/api/v1/roll/";

        fetch(url, { credentials: 'same-origin'
          })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);

                return response;
            })
            .then((data) => {
                this.setState({
                    movies: data.movies,
                });
            })
            .catch((error) => console.log(error)); 
    }

    handleClick() {
        const { lastWatched } = this.state;
        const rollUrl = `/api/v1/roll/${lastWatched}/`;
        if (lastWatched == 'Picked Last'){
            this.setState({rolledMovie: 'Please select last person to pick!'});
            return;
        }
        fetch(rollUrl)
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                
                return response.json();
            })
            .then((data) => {
                this.setState({
                    rolledMovie: data.movie.title,
                });
            })
            .catch((error) => console.log(error));
    }

    render(){

        const { lastWatched } = this.state;
        const { rolledMovie } = this.state;
        const { toggleRerender } = this.state;
        return (
            <div>
                <div className="rollDiv">
                    {toggleRerender && <h1 className="rollHeading">Roll for Movie</h1>}
                    
                    <DropdownButton bsPrefix="lastSelectedButton" id="dropdown-basic-button" title={lastWatched}>
                        <Dropdown.Item className="dropdownItem" onClick={() => this.setState({ lastWatched: "Ryan"})}>Ryan</Dropdown.Item>
                        <Dropdown.Item className="dropdownItem" onClick={() => this.setState({ lastWatched: "Jon"})}>Jon</Dropdown.Item>
                        <Dropdown.Item className="dropdownItem" onClick={() => this.setState({ lastWatched: "Justin"})}>Justin</Dropdown.Item>
                        <Dropdown.Item className="dropdownItem" onClick={() => this.setState({ lastWatched: "Marcus"})}>Marcus</Dropdown.Item>
                    </DropdownButton>

                    <h1 className="rolledMovie">{rolledMovie}</h1>

                    <Button className="rollButton" size="lg" onClick={this.handleClick}> Roll!</Button>
                    <hr></hr>
                    
                </div>
                
                <h1 className="moviesHeading">Movies in Rotation</h1>
                        
                <Feed url="/api/v1/inrotation/" 
                getNumInRotation={this.props.getNumInRotation}
                numInRotation={this.props.numInRotation}
                toggleRerender={this.state.toggleRerender}
                rerenderParent={this.rerenderParent}
                isLoggedIn={this.state.isLoggedIn}
                sortBy="suggestedby"
                />
                <h1 className="moviesHeading">Movies on Deck</h1>
                <Feed url="/api/v1/ondeck/" 
                getNumInRotation={this.props.getNumInRotation}
                numInRotation={this.props.numInRotation}
                toggleRerender={this.state.toggleRerender}
                rerenderParent={this.rerenderParent}
                sortBy="suggestedby"
                isLoggedIn={this.state.isLoggedIn}/>
            </div>
            
        );
    }
}

export default Home;