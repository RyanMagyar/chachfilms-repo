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
        const movieState = this.props;
        const {numInRotation} = this.props;
        this.state = { currentState: movieState, showWatched: false, fade: false,
         showDeleted: false, isLoggedIn: userToken, showInRotation: false,
         showOnDeck: false, showWaring: false,
        }
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleWatchedClick = this.handleStateButtonClick.bind(this);
    }


    componentDidMount() {

        const { movieState } = this.props;
        this.setState({currentState: movieState, show: false,});
        
    }

    handleDeleteClick(){
        const { movieid } = this.props;
        const setStateUrl = `/api/v1/m/${movieid}/delete/`;
        const {isLoggedIn} = this.state;

      
        fetch(setStateUrl, {
            credentials: 'same-origin',
            method: 'DELETE',
            headers: {"authorization": `Bearer ${isLoggedIn}`},
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                } else {
                    this.setState({currentState: "deleted"});
                }
            })
            .catch((error) => console.log(error))
        this.props.rerenderParent();
        
    }

    handleStateButtonClick(newState){
        const { movieid } = this.props;
        const setStateUrl = `/api/v1/m/${movieid}/setstate/?state=${newState}`;
        const {isLoggedIn} = this.state;
        console.log(newState);
      
        fetch(setStateUrl, {
            credentials: 'same-origin',
            method: 'PUT',
            headers: {"authorization": `Bearer ${isLoggedIn}`},
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                } else {
                    this.setState({currentState: newState});
                }
            })
            .catch((error) => console.log(error))
        this.props.rerenderParent();
    }
    

    render() {
        const { imdbrating } = this.props;
        const { cover} = this.props;
        const { title } = this.props;
        const { suggestedby } = this.props;
        const { year } = this.props;
        const { director } = this.props;
        const { movieid } = this.props;
        const { currentState } = this.state;
        const {movieState} = this.props;
        const { showWatched } = this.state;
        const { showDeleted } = this.state;
        const { showOnDeck } = this.state;
        const { showWarning } = this.state;
        const { showInRotation } = this.state;
        const { numInRotation } = this.props;
        const {fade} = this.state
        const { isLoggedIn } = this.state;

        if(currentState !== movieState){
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
                    {(isLoggedIn && currentState == 'ondeck') && <Button variant="success" className="onDeckButton"onClick={ () => {
                        const numInRotation = this.props.numInRotation;
                        if(numInRotation[suggestedby] == 2){
                            this.setState({showWarning: true})} else {
                                this.setState({showInRotation: true})
                            }
                        }}>In Rotation</Button>}
                    {(isLoggedIn && currentState == 'inrotation') && <Button variant="success" className="onDeckButton"onClick={ () => this.setState({showOnDeck: true})}>On Deck</Button>}
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
                        <Button className="modalButton" variant="success" onClick={this.handleStateButtonClick.bind(this, 'watched')}>
                            Confirm
                        </Button>
                        <Button className="modalButton" variant="secondary" onClick={ () => this.setState({showWatched: false})}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal centered contentClassName='watchedModal' show={showOnDeck} animation={false} onHide={() => this.setState({showOnDeck: false})}>
                    <Modal.Header bsPrefix="modalHeader" closeButton>
                        <div className="modalHeaderLeft"></div>
                        <Modal.Title bsPrefix="modalTitle">Are You Sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body bsPrefix="modalBody"> 
                    <span className="modalBodyText">Are you sure you want to mark this movie as on deck?</span>
                    </Modal.Body>
                    <Modal.Footer bsPrefix="modalFooter">
                        <Button className="modalButton" variant="success" onClick={this.handleStateButtonClick.bind(this, 'ondeck')}>
                            Confirm
                        </Button>
                        <Button className="modalButton" variant="secondary" onClick={ () => this.setState({showOnDeck: false})}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal centered contentClassName='watchedModal' show={showWarning} animation={false} onHide={() => this.setState({showWarning: false})}>
                    <Modal.Header bsPrefix="modalHeader" closeButton>
                        <div className="modalHeaderLeft"></div>
                        <Modal.Title bsPrefix="modalTitle">Too Many In Rotation!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body bsPrefix="modalBody"> 
                    <span className="modalBodyText">{suggestedby} already has two movies in rotation. 
                    Please delete a movie in rotation or move one to on deck.</span>
                    </Modal.Body>
                    <Modal.Footer bsPrefix="modalFooter">
                        <Button className="modalButton" variant="success" onClick={() =>  this.setState({showWarning: false})}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal centered contentClassName='watchedModal' show={showInRotation} animation={false} onHide={() => this.setState({showInRotation: false})}>
                    <Modal.Header bsPrefix="modalHeader" closeButton>
                        <div className="modalHeaderLeft"></div>
                        <Modal.Title bsPrefix="modalTitle">Are You Sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body bsPrefix="modalBody"> 
                    <span className="modalBodyText">Are you sure you want to put this movie in rotation?</span>
                    </Modal.Body>
                    <Modal.Footer bsPrefix="modalFooter">
                        <Button className="modalButton" variant="success" onClick={this.handleStateButtonClick.bind(this, 'inrotation')}>
                            Confirm
                        </Button>
                        <Button className="modalButton" variant="secondary" onClick={ () => this.setState({showInRotation: false})}>
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

Movie.propTypes = {
    movieState: PropTypes.string.isRequired,
};

export default Movie;