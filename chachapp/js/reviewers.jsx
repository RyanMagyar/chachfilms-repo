
import React from 'react';


class Reviewers extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            reviewers: [],
        };
        this.getReviewers = this.getReviewers.bind(this);
    }

    componentDidMount(){
        this.getReviewers();
    }

    getReviewers(){

        fetch('/api/v1/reviewers/', 
        { credentials: 'same-origin',
            method: 'GET',
          })
        .then((response) => {
            if (!response.ok) throw Error(response.statusText);

            return response.json();
        })
        .then((data) => {
            this.setState({
                reviewers: data.reviewers,
            });
        })
        .catch((error) => console.log(error)); 
    }


    render(){
        const { reviewers } = this.state;

        return(
            <div className="reviewersWrapper">
                <h1 className="reviewersHeading">Meet the Reviewers</h1>
                {reviewers.map((reviewer) => (
                    <div key={reviewer.username} className="reviewerDiv">
                        <div className="profilePicWrapper">
                            <img className="profilePicture" src={reviewer.filename}></img>
                        </div>
                        <div className="reviewerContent">
                            <h1 className="reviewerName">{reviewer.fullname}</h1>
                            <h2 className="bioHeading">Bio:</h2>
                            <p className="reviewerBio">{reviewer.bio}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
};

export default Reviewers;