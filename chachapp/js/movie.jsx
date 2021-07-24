import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Textfit } from 'react-textfit';
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';



class Movie extends React.Component {
    constructor(props) {
        super(props);
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        this.state = { state: '', showWatched: false, fade: false, showDeleted: false, isLoggedIn: userToken,
        }
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleWatchedClick = this.handleWatchedClick.bind(this);
        

    }


    componentDidMount() {

        const { state } = this.props;
        this.setState({state, show: false,});
        
    }

    handleDeleteClick(){
        const { movieid } = this.props;
        const setStateUrl = `/api/v1/m/${movieid}/delete/`;
      
        fetch(setStateUrl, {
            credentials: 'same-origin',
            method: 'DELETE',
            headers: {"authorization": `Bearer ${isLoggedIn}`},
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                } else {
                    this.setState({state: "deleted"});
                }
            })
            .catch((error) => console.log(error))
    }

    handleWatchedClick(){
        const { movieid } = this.props;
        const setStateUrl = `/api/v1/m/${movieid}/setstate/?state=watched`;
        const {isLoggedIn} = this.state;

      
        fetch(setStateUrl, {
            credentials: 'same-origin',
            method: 'PUT',
            headers: {"authorization": `Bearer ${isLoggedIn}`},
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                } else {
                    this.setState({state: "watched"});
                }
            })
            .catch((error) => console.log(error))

    }

    

    render() {
        const { imdbrating } = this.props;
        const { cover} = this.props;
        const { title } = this.props;
        const { suggestedby } = this.props;
        const { year } = this.props;
        const { director } = this.props;
        const { movieid } = this.props;
        const { state } = this.state;
        const { showWatched } = this.state;
        const { showDeleted } = this.state;
        const {fade} = this.state
        const { isLoggedIn } = this.state;

        if(state == 'watched' || state =='deleted'){
            return(
                <></>
            )
        }


        return(
            <div className="movieDiv">
                <h1 className="movieTitle">{title}</h1>
                <img className="movieCover" alt="" src={cover} />
                <span className="movieInfo">Suggested by: {suggestedby}</span><br></br>
                <span className="movieInfo">Directed by: {director} ({year})</span><br></br>
                <span className="movieInfo">IMDB Rating: {imdbrating}</span><br></br>
                <div className="movieButtons">
                   {isLoggedIn && <Button variant="danger" className="deleteButton" onClick={ () => this.setState({showDeleted: true})}>Delete</Button>}
                    {isLoggedIn && <Button className="watchedButton"onClick={ () => this.setState({showWatched: true})}>Watched</Button>}
                </div>
                <Modal centered contentClassName='watchedModal' show={showWatched} animation={false} onHide={() => this.setState({showWatched: false})}>
                    <Modal.Header bsPrefix="modalHeader" closeButton>
                        <div className="modalHeaderLeft"></div>
                        <Modal.Title bsPrefix="modalTitle">Are You Sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body bsPrefix="modalBody"> 
                    <span className="modalBodyText">Are you sure you want to mark this movie as watched?</span>
                    </Modal.Body>
                    <Modal.Footer bsPrefix="modalFooter">
                        <Button className="modalButton" variant="success" onClick={this.handleWatchedClick}>
                            Confirm
                        </Button>
                        <Button className="modalButton" variant="secondary" onClick={ () => this.setState({showWatched: false})}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal centered contentClassName='watchedModal' show={showDeleted} animation={false} onHide={() => this.setState({showDeleted: false})}>
                    <Modal.Header bsPrefix="modalHeader" closeButton>
                        <div className="modalHeaderLeft"></div>
                        <Modal.Title bsPrefix="modalTitle">Are You Sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body bsPrefix="modalBody"> 
                    <span className="modalBodyText">Are you sure you want to delete this movie?</span><br></br>
                    <span>This action cannot be undone.</span>
                    </Modal.Body>
                    <Modal.Footer bsPrefix="modalFooter">
                        <Button className="modalButton" variant="danger" onClick={this.handleDeleteClick}>
                            Delete
                        </Button>
                        <Button className="modalButton" variant="secondary" onClick={ () => this.setState({showDeleted: false})}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                
            </div>
        )
    }
}

export default Movie;