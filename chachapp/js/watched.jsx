import React from 'react';
import Feed from './feed';
import { DropdownButton } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';

class Watched extends React.Component{

    constructor(props) {
        super(props);
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        this.state = {
            isLoggedIn: userToken, sortBy: "added"
        };

    }

    

    render(){
        console.log('rerender')
        return(
            <div>
                <div className="watchedHeading">
                    <DropdownButton bsPrefix="navigationMenu" id="dropdown-basic-button" title='Sort By'>
                        <Dropdown.Item onClick={() => this.setState({sortBy: "added"})} className="navigationItem">
                            Most Recent
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => this.setState({sortBy: "-added"})} className="navigationItem">
                            Oldest
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => this.setState({sortBy: "-average"})} className="navigationItem">
                            Rating (Highest)
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => this.setState({sortBy: "average"})} className="navigationItem">
                            Rating (Lowest)
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => this.setState({sortBy: "suggestedby"})} className="navigationItem">
                            Reviewer
                        </Dropdown.Item>
                    </DropdownButton>
                    <h1 className="moviesHeading">Watched Films</h1>
                    <div className="fakeHeadingDiv"></div>

                </div>
                    <Feed url="/api/v1/watched/"
                        getNumInRotation={this.props.getNumInRotation}
                        numInRotation={this.props.numInRotation}
                        isLoggedIn={this.state.isLoggedIn}
                        sortBy={this.state.sortBy}
                    />
            </div>
        );
    }
    
        
};

export default Watched;