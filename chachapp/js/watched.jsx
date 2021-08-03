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
            isLoggedIn: userToken, sortBy: "-added", filterBy: "",
            toggleRerender: false,
        };

        this.rerenderParent = this.rerenderParent.bind(this);

    }

    rerenderParent() {
        this.setState({toggleRerender: !this.state.toggleRerender});
    }

    render(){
        return(
            <div>
                <div className="watchedHeading">
                    <DropdownButton bsPrefix="navigationMenu" id="dropdown-basic-button" title='Sort By'>
                        <Dropdown.Item active={this.state.sortBy == '-added' ? true : false} onClick={() => this.setState({sortBy: "-added"})} className="navigationItem">
                            Most Recent
                        </Dropdown.Item>
                        <Dropdown.Item active={this.state.sortBy == 'added' ? true : false} onClick={() => this.setState({sortBy: "added"})} className="navigationItem">
                            Oldest
                        </Dropdown.Item>
                        <Dropdown.Item active={this.state.sortBy == '-average' ? true : false} onClick={() => this.setState({sortBy: "-average"})} className="navigationItem">
                            Rating (Highest)
                        </Dropdown.Item>
                        <Dropdown.Item active={this.state.sortBy == 'average' ? true : false} onClick={() => this.setState({sortBy: "average"})} className="navigationItem">
                            Rating (Lowest)
                        </Dropdown.Item>
                        <Dropdown.Item active={this.state.sortBy == 'suggestedby' ? true : false} onClick={() => this.setState({sortBy: "suggestedby"})} className="navigationItem">
                            Suggested By
                        </Dropdown.Item>
                        <Dropdown.Item active={this.state.sortBy == 'year' ? true : false} onClick={() => this.setState({sortBy: "year"})} className="navigationItem">
                            Year (Oldest)
                        </Dropdown.Item>
                        <Dropdown.Item active={this.state.sortBy == '-year' ? true : false} onClick={() => this.setState({sortBy: "-year"})} className="navigationItem">
                            Year (Newest)
                        </Dropdown.Item>
                    </DropdownButton>
                    <h1 className="moviesHeading">Watched Films</h1>
                    <DropdownButton bsPrefix="navigationMenu" id="dropdown-basic-button" title='Filter By'>
                        <Dropdown.Item active={this.state.filterBy == 'Ryan' ? true : false} 
                        onClick={() => this.state.filterBy == "Ryan" ? this.setState({filterBy: ""}) : this.setState({filterBy: "Ryan"})} 
                        className="navigationItem"
                        >
                            Ryan
                        </Dropdown.Item>
                        <Dropdown.Item active={this.state.filterBy == 'Marcus' ? true : false} 
                        onClick={() => this.state.filterBy == "Marcus" ? this.setState({filterBy: ""}) : this.setState({filterBy: "Marcus"})} 
                        className="navigationItem"
                        >
                            Marcus
                        </Dropdown.Item>
                        <Dropdown.Item active={this.state.filterBy == 'Jon' ? true : false} 
                        onClick={() => this.state.filterBy == "Jon" ? this.setState({filterBy: ""}) : this.setState({filterBy: "Jon"})} 
                        className="navigationItem"
                        >
                            Jon
                        </Dropdown.Item>
                        <Dropdown.Item active={this.state.filterBy == 'Justin' ? true : false} 
                        onClick={() => this.state.filterBy == "Justin" ? this.setState({filterBy: ""}) : this.setState({filterBy: "Justin"})} 
                        className="navigationItem"
                        >
                            Justin
                        </Dropdown.Item>
                    </DropdownButton>
               {/* <div className="fakeHeadingDiv"></div>*/}

                </div>
                    <Feed url="/api/v1/watched/"
                        getNumInRotation={this.props.getNumInRotation}
                        toggleRerender={this.state.toggleRerender}
                        rerenderParent={this.rerenderParent}
                        numInRotation={this.props.numInRotation}
                        isLoggedIn={this.state.isLoggedIn}
                        sortBy={this.state.sortBy}
                        filterBy={this.state.filterBy}

                    />
            </div>
        );
    }
    
        
};

export default Watched;