import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FilmLoader from '../static/images/filmLoader.gif'
import { Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';



class Movie extends React.Component {
    constructor(props) {
        super(props);
        const movieState = this.props;
        const {numInRotation} = this.props;
        this.state = { currentState: movieState, showWatched: false, fade: false,
         showDeleted: false, isLoggedIn: this.props.isLoggedIn, showInRotation: false,
         showOnDeck: false, showWaring: false, deleteChecked: false, ratings: [], average: -1,
         showRating: false, newRating: 0, message: '', confirmDisabled: false, filmLoading: false,
         backdrop: true,
        }
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleWatchedClick = this.handleStateButtonClick.bind(this);
        this.getRatings = this.getRatings.bind(this);
        this.handleSubmitRating = this.handleSubmitRating.bind(this);


    }


    componentDidMount() {

        const { movieState } = this.props;
        this.setState({currentState: movieState, show: false,});
        this.getRatings();
    }

    getRatings(){
        const { movieid } = this.props;
        const setStateUrl = `/api/v1/m/${movieid}/ratings/`;

        fetch(setStateUrl, {
            credentials: 'same-origin',
            method: 'GET',
        })
        .then((response) => {
            if (!response.ok) throw Error(response.statusText);
            
            return response.json();
        })
        .then((data) => {
            this.setState({ratings: data.ratings,
                           average: data.average,
                          });
        })
        .catch((error) => console.log(error))
    }

    handleDeleteClick(){
        const { movieid } = this.props;
        const setStateUrl = `/api/v1/m/${movieid}/delete/?deleteChecked=${this.state.deleteChecked}`;
        const {isLoggedIn} = this.state;
        const pastState = this.state.currentState;
      
        fetch(setStateUrl, {
            credentials: 'same-origin',
            method: 'DELETE',
            headers: {"authorization": `Bearer ${isLoggedIn}`},
        })
        .then((response) => {
             if (!response.ok) {
             throw Error(response.statusText);
                } else {
               this.setState({currentState: "deleted",
                              deleteChecked: false,
                              filmLoading: false,
                              backdrop: true});
                if(pastState != 'watched') this.props.rerenderParent();


            }
        })
        .catch((error) => console.log(error))
        
    }

    componentDidUpdate(previousProps){
        if(previousProps.isLoggedIn != this.props.isLoggedIn){
            this.setState({isLoggedIn: this.props.isLoggedIn});
        }
    }

    handleStateButtonClick(newState){
        const { movieid } = this.props;
        const setStateUrl = `/api/v1/m/${movieid}/setstate/?state=${newState}`;
        const {isLoggedIn} = this.state;
        const pastState = this.state.currentState;
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
                if(pastState != 'watched') this.props.rerenderParent();
            }
        })
        .catch((error) => console.log(error))
    };

    handleOnInputChange = (e) => {
        const newRating = e.target.value;
        console.log(newRating);
        console.log(isNaN(newRating));

        
        if(newRating > 10){
            this.setState({newRating, 
                message: 'Please enter a rating less than 10', 
                confirmDisabled: true});
        } else if(newRating < 0){
            this.setState({newRating, 
                message: 'Please enter a rating greater than 0', 
                confirmDisabled: true});
        } else if (newRating.toLowerCase() == 'slept') {
            this.setState({newRating: newRating, 
                confirmDisabled: false, 
                message: ''}
            );
        } else if(isNaN(newRating) || newRating == ''){
            this.setState({newRating, 
                confirmDisabled: true, 
                message: 'Please enter a number or slept'}
            );
        } else {
            this.setState({newRating, 
                confirmDisabled: false, 
                message: ''}
            );
        }
    };

    handleSubmitRating(){
        const { newRating } = this.state;
        const { movieid } = this.props;
        const user = localStorage.getItem('username');
        const { isLoggedIn } = this.state;
        const ratingUrl = `/api/v1/m/${movieid}/rate/?user=${user}&rating=${newRating}`;
        console.log(ratingUrl);
        console.log(movieid);
        fetch(ratingUrl, {
            credentials: 'same-origin',
            method: 'POST',
            headers: {"authorization": `Bearer ${isLoggedIn}`},
        })
        .then((response) => {
            if (!response.ok) {
                 throw Error(response.statusText);
            } else {
                this.setState({showRating: false, 
                    newRating: 0, message: '', confirmDisabled: false}, this.getRatings());
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
        const { ratings } = this.state;
        const { average } = this.state;
        const { showRating } = this.state;
        const { newRating } = this.state;
        const { filmLoading } = this.state;
        const { backdrop } = this.state;




        if(currentState !== movieState){
            return(
                <></>
            )
        }


        return(
            <div className="movieDiv">
                <h1 className="movieTitle">{title}</h1>
                <img className="movieCover" alt="" src={cover} />
                <div className="suggestAndRate">
                    <span className="movieInfo">Suggested by: {suggestedby}</span>
                    {isLoggedIn && <Button variant="warning" className="rateButton"onClick={ () => this.setState({showRating: true})}>Rate</Button>}
                </div>
                <br></br>
                <span className="movieInfo">Directed by: {director} ({year})</span><br></br>
                <span className="movieInfo">IMDB Rating: {imdbrating}</span><br></br>
                { average == -1 ?
                    <div>
                        <span className="movieInfo">No Ratings Yet</span><br></br>
                    </div>
                    :
                    <div>
                    {ratings.map(rating => {
                        return(
                        <div key={rating.reviewer}>
                            <span className="movieInfo">{rating.reviewer}: {rating.rating == -1 ? 'Null' : rating.rating}</span><br></br>
                        </div>);
                    })}
                        <span className="movieInfo">Average: {average}</span><br></br>
                    </div>
                 }
                <div className="movieButtons">
                    {isLoggedIn && <Button variant="danger" className="deleteButton" onClick={ () => this.setState({showDeleted: true})}>Delete</Button>}
                    {(isLoggedIn && (currentState == 'ondeck' || currentState == 'watched')) && <Button variant="success" className="onDeckButton"onClick={ () => {
                        const numInRotation = this.props.numInRotation;
                        if(numInRotation[suggestedby] >= 2){
                            this.setState({showWarning: true})} else {
                                this.setState({showInRotation: true})
                            }
                        }}>In Rotation</Button>}
                    {(isLoggedIn && (currentState == 'inrotation' || currentState == 'watched')) && 
                    <Button variant={currentState == 'watched' ? "primary" : "success"} className="onDeckButton"onClick={ () => this.setState({showOnDeck: true})}>On Deck</Button>}
                    {(isLoggedIn && currentState != 'watched') && <Button className="watchedButton"onClick={ () => this.setState({showWatched: true})}>Watched</Button>}

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

                <Modal centered contentClassName='deletedModal' backdrop={backdrop}show={showDeleted} animation={false} onHide={() => this.setState({deleteChecked: false, showDeleted: false})}>
                    {filmLoading ?
                        <img  src={FilmLoader} className={`film-loading ${filmLoading ? 'show' : 'hide' }`}  alt="loader"/>
                    :<div className="modal-content deletedModal">
                    <Modal.Header bsPrefix="modalHeader" closeButton>
                        <div className="modalHeaderLeft"></div>
                        <Modal.Title bsPrefix="modalTitle">Are You Sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body bsPrefix="modalBody"> 
                        <span className="modalBodyText">Are you sure you want to delete this movie?</span><br></br>
                        <span className="modalBodyTextWarning">This action cannot be undone.</span>
                        <span>Would you like to delete files for this movie?</span><br></br>
                        <Button variant='outline-danger' active={this.state.deleteChecked} className='deleteFilesButton' onClick={()=> this.setState({deleteChecked: !this.state.deleteChecked})}>
                            Yes
                        </Button>
                    </Modal.Body>
                    <Modal.Footer bsPrefix="modalFooter">
                        <Button className="modalButton" variant="danger" onClick={() => this.setState({filmLoading: true, backdrop:'static'},this.handleDeleteClick)}>
                            Delete
                        </Button>
                        <Button className="modalButton" variant="secondary" onClick={ () => this.setState({deleteChecked: false, showDeleted: false})}>
                            Close
                        </Button>
                    </Modal.Footer>
                    </div>
                    }
                </Modal>

                <Modal centered contentClassName='rateModal' show={showRating} animation={false} onHide={() => this.setState({showRating: false})}>
                    <Modal.Header bsPrefix="modalHeader" closeButton>
                        <div className="modalHeaderLeft"></div>
                        <Modal.Title bsPrefix="modalTitle">Rate {title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body bsPrefix="modalBody"> 
                    <span className="modalBodyText">What would you like to rate this film?</span>
                    <label className='ratingLabel' htmlFor='ratingInput'>
                        <input type='text' 
                        value={newRating}
                        id ='ratingInput'
                        placeholder='0'
                        onChange={this.handleOnInputChange}
                        />
                    </label>
                    <span className="modalBodyTextWarning">{this.state.message}</span>
                    </Modal.Body>
                    <Modal.Footer bsPrefix="modalFooter">
                        <Button className="modalButton" disabled={this.state.confirmDisabled} variant="success" onClick={this.handleSubmitRating}>
                            Confirm
                        </Button>
                        <Button className="modalButton" variant="secondary" onClick={ () => this.setState({showRating: false, 
                                                                                                            newRating: 0, message: '', confirmDisabled: false})}>
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