import React from 'react';
import Feed from './feed';

class Watched extends React.Component{

    constructor(props) {
        super(props);
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        this.state = {
            isLoggedIn: userToken,
        };

    }

    

    render(){
        return(
            <div>
                <h1 className="moviesHeading">Watched Films</h1>
                        
                    <Feed url="/api/v1/watched/"
                        getNumInRotation={this.props.getNumInRotation}
                        numInRotation={this.props.numInRotation}
                        isLoggedIn={this.state.isLoggedIn}
                    />
            </div>
        );
    }
    
        
};

export default Watched;