import React from 'react';
import FilmLoader from '../static/images/filmLoader.gif'
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Redirect } from 'react-router';
import Comment from './comment';
import 'bootstrap/dist/css/bootstrap.min.css';



class MoviePage extends React.Component {
    constructor(props) {
        super(props);
        const numInRotation = this.props.numInRotation;
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        const movieid = this.props.match.params.movieid;

        this.state = {
            movieid: movieid, currentState: '', showWatched: false, fade: false,
            showDeleted: false, isLoggedIn: userToken, showInRotation: false, movieState: '',
            showOnDeck: false, showWarning: false, deleteChecked: false, ratings: [],
            average: 0, showRating: false, newRating: 0, message: '', confirmDisabled: false, filmLoading: false,
            backdrop: true, genres: [], deleteClicked: false, numInRotation: numInRotation, comments: [],
            commentText: '', commentCharsLeft: 1024,
        }
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleWatchedClick = this.handleStateButtonClick.bind(this);
        this.getRatings = this.getRatings.bind(this);
        this.handleSubmitRating = this.handleSubmitRating.bind(this);
        this.getMovieInfo = this.getMovieInfo.bind(this);
        this.getComments = this.getComments.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);


    }


    componentDidMount() {

        this.getMovieInfo();
        this.getComments();
    };

    handleCommentSubmit() {
        const { commentText,
            movieid, isLoggedIn } = this.state;

        fetch(`/api/v1/m/${movieid}/comments/`, {
            credentials: 'same-origin',
            method: 'POST',
            headers: {
                "authorization": `Bearer ${isLoggedIn}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ commentText: commentText }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                } else {
                    this.setState({
                        commentText: '',
                    }, this.getComments);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data.access_token);
                data.access_token && localStorage.setItem('token', JSON.stringify(data.access_token));
            })
            .catch((error) => console.log(error))


    };

    handleCommentChange(event) {
        var input = event.target.value;
        if (input.length <= 1024) {
            this.setState({
                commentCharsLeft: 1024 - input.length,
                commentText: input,
            });
        }
    };

    getComments() {
        const movieid = this.props.match.params.movieid;
        const url = `/api/v1/m/${movieid}/comments/`;

        fetch(url, {
            credentials: 'same-origin',
            method: 'GET',
        })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);

                return response.json();
            })
            .then((data) => {
                this.setState({
                    comments: data.comments
                });
            })
            .catch((error) => console.log(error))


    }
    getMovieInfo() {
        const movieid = this.props.match.params.movieid;
        const url = `/api/v1/m/${movieid}/info/`

        fetch(url, {
            credentials: 'same-origin',
            method: 'GET',
        })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);

                return response.json();
            })
            .then((data) => {
                this.setState({
                    ratings: data.movie.ratings,
                    average: data.movie.average,
                    movieState: data.movie.state,
                    imdbrating: data.movie.imdbrating,
                    cover: data.movie.filename,
                    title: data.movie.title,
                    suggestedby: data.movie.suggestedby,
                    year: data.movie.year,
                    director: data.movie.director,
                    currentState: data.movie.state,
                    show: false,
                    genres: data.movie.genres,
                    added: data.movie.added,
                });
            })
            .catch((error) => console.log(error))


    }

    getRatings() {
        const movieid = this.state.movieid;
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
                this.setState({
                    ratings: data.ratings,
                    average: data.average,
                });
            })
            .catch((error) => console.log(error))
    }

    handleDeleteClick() {
        const movieid = this.state.movieid;
        const setStateUrl = `/api/v1/m/${movieid}/delete/?deleteChecked=${this.state.deleteChecked}`;
        const { isLoggedIn } = this.state;

        fetch(setStateUrl, {
            credentials: 'same-origin',
            method: 'DELETE',
            headers: { "authorization": `Bearer ${isLoggedIn}` },
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                } else {
                    this.setState({
                        currentState: "deleted",
                        deleteChecked: false,
                        filmLoading: false,
                        backdrop: true,
                        deleteClicked: true,
                        showDeleted: false
                    });
                }
            })
            .catch((error) => console.log(error))
    }

    componentDidUpdate(prevProps, previousState) {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        if (previousState.isLoggedIn != userToken) {
            this.setState({ isLoggedIn: userToken });
        }
    }

    handleStateButtonClick(newState) {
        const { movieid, isLoggedIn, currentState } = this.state;
        const setStateUrl = `/api/v1/m/${movieid}/setstate/?state=${newState}`;

        fetch(setStateUrl, {
            credentials: 'same-origin',
            method: 'PUT',
            headers: { "authorization": `Bearer ${isLoggedIn}` },
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                } else {
                    this.setState({
                        currentState: newState,
                        showWatched: false,
                        showInRotation: false,
                        showOnDeck: false,
                    }, () => {
                        if (currentState == 'inrotation') {
                            const newNumInRotation = this.state.numInRotation[this.state.suggestedby] - 1;
                            this.setState({ numInRotation: newNumInRotation });
                        }
                    });
                    return response.json();
                }
            })
            .then((data) => {
                console.log(data.access_token);
                data.access_token && localStorage.setItem('token', JSON.stringify(data.access_token));
            })
            .catch((error) => console.log(error))
    };

    handleOnInputChange = (e) => {
        const newRating = e.target.value;

        if (newRating > 10) {
            this.setState({
                newRating,
                message: 'Please enter a rating less than 10',
                confirmDisabled: true
            });
        } else if (newRating < 0) {
            this.setState({
                newRating,
                message: 'Please enter a rating greater than 0',
                confirmDisabled: true
            });
        } else if (newRating.toLowerCase() == 'slept') {
            this.setState({
                newRating: newRating,
                confirmDisabled: false,
                message: ''
            }
            );
        } else if (isNaN(newRating) || newRating == '') {
            this.setState({
                newRating,
                confirmDisabled: true,
                message: 'Please enter a number or slept'
            }
            );
        } else {
            this.setState({
                newRating,
                confirmDisabled: false,
                message: ''
            }
            );
        }
    };

    handleSubmitRating() {
        const { newRating, movieid, isLoggedIn } = this.state;

        const user = localStorage.getItem('username');
        const ratingUrl = `/api/v1/m/${movieid}/rate/?user=${user}&rating=${newRating}`;

        fetch(ratingUrl, {
            credentials: 'same-origin',
            method: 'POST',
            headers: { "authorization": `Bearer ${isLoggedIn}` },
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                } else {
                    this.setState({
                        showRating: false,
                        newRating: 0, message: '', confirmDisabled: false
                    }, () => {
                        this.getRatings();
                    });
                    return response.json();
                }
            })
            .then((data) => {
                console.log(data.access_token);
                data.access_token && localStorage.setItem('token', JSON.stringify(data.access_token));
            })
            .catch((error) => console.log(error))

    }


    render() {
        const { imdbrating, cover, title,
            suggestedby, year, director } = this.state;
        const { currentState } = this.state;
        const { showWatched } = this.state;
        const { showDeleted } = this.state;
        const { showOnDeck } = this.state;
        const { showWarning } = this.state;
        const { showInRotation } = this.state;
        const { isLoggedIn } = this.state;
        const { ratings } = this.state;
        const { average } = this.state;
        const { showRating } = this.state;
        const { newRating } = this.state;
        const { filmLoading } = this.state;
        const { backdrop } = this.state;
        const { genres } = this.state;
        const { comments } = this.state;

        if (this.state.deleteClicked) return (<Redirect to="/" />);

        return (
            <div>

                <div className="moviePageDiv">
                    <div className="moviePageCoverDiv">
                        <img className="moviePageCover" alt="" src={cover} />
                    </div>
                    <div className="moviePageContentDiv">
                        <h1 className="moviePageTitle">{title}</h1>
                        <hr className="moviePageTitleHr"></hr>
                        <div className="suggestAndRatePage">
                            <span className="moviePageInfo">Suggested by: {suggestedby}</span>
                            {isLoggedIn && <Button variant="warning" className="rateButtonPage" onClick={() => this.setState({ showRating: true })}>Rate</Button>}
                        </div>
                        <br></br>
                        <hr className="moviePageTitleHr"></hr>
                        <span className="moviePageInfo">Directed by: {director} ({year})</span><br></br>
                        <div className="movieGenres">Genres: {genres.slice(0, 3).map((genre =>
                            <div key={genre} className="movieGenre">{genre}</div>
                        ))
                        }</div>
                        <hr className="moviePageTitleHr"></hr>
                        <span className="movieImdbRating">IMDB Rating: {imdbrating}</span><br></br>
                        {ratings.length == 0 ?
                            <div>
                                <span className="moviePageInfo">No Ratings Yet</span><br></br>
                            </div>
                            :
                            <div>
                                {ratings.map(rating => {
                                    return (
                                        <div key={rating.reviewer}>
                                            <span className="moviePageInfo">{rating.reviewer}: {rating.rating == -1 ? 'Null' : rating.rating}</span><br></br>
                                        </div>);
                                })}
                                <span className="moviePageInfo">Average: {average == -1 ? "Null" : average}</span><br></br>
                            </div>
                        }
                        <div className="moviePageButtons">
                            {isLoggedIn && <Button variant="danger" className="deletePageButton" onClick={() => this.setState({ showDeleted: true })}>Delete</Button>}
                            {(isLoggedIn && (currentState == 'ondeck' || currentState == 'watched')) && <Button variant="success" className="onDeckPageButton" onClick={() => {
                                const numInRotation = this.state.numInRotation;
                                if (numInRotation[suggestedby] >= 2) {
                                    this.setState({ showWarning: true })
                                } else {
                                    this.setState({ showInRotation: true })
                                }
                            }}>In Rotation</Button>}
                            {(isLoggedIn && (currentState == 'inrotation' || currentState == 'watched')) &&
                                <Button variant={currentState == 'watched' ? "primary" : "success"} className="onDeckPageButton" onClick={() => this.setState({ showOnDeck: true })}>On Deck</Button>}
                            {(isLoggedIn && currentState != 'watched') && <Button className="watchedPageButton" onClick={() => this.setState({ showWatched: true })}>Watched</Button>}

                        </div>
                    </div>
                    <Modal centered contentClassName='watchedModal' show={showWatched} animation={false} onHide={() => this.setState({ showWatched: false })}>
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
                            <Button className="modalButton" variant="secondary" onClick={() => this.setState({ showWatched: false })}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal centered contentClassName='watchedModal' show={showOnDeck} animation={false} onHide={() => this.setState({ showOnDeck: false })}>
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
                            <Button className="modalButton" variant="secondary" onClick={() => this.setState({ showOnDeck: false })}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal centered contentClassName='watchedModal' show={showWarning} animation={false} onHide={() => this.setState({ showWarning: false })}>
                        <Modal.Header bsPrefix="modalHeader" closeButton>
                            <div className="modalHeaderLeft"></div>
                            <Modal.Title bsPrefix="modalTitle">Too Many In Rotation!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body bsPrefix="modalBody">
                            <span className="modalBodyText">{suggestedby} already has two movies in rotation.
                                Please delete a movie in rotation or move one to on deck.</span>
                        </Modal.Body>
                        <Modal.Footer bsPrefix="modalFooter">
                            <Button className="modalButton" variant="success" onClick={() => this.setState({ showWarning: false })}>
                                OK
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal centered contentClassName='watchedModal' show={showInRotation} animation={false} onHide={() => this.setState({ showInRotation: false })}>
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
                            <Button className="modalButton" variant="secondary" onClick={() => this.setState({ showInRotation: false })}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal centered contentClassName='deletedModal' backdrop={backdrop} show={showDeleted} animation={false} onHide={() => this.setState({ deleteChecked: false, showDeleted: false })}>
                        {filmLoading ?
                            <img src={FilmLoader} className={`film-loading ${filmLoading ? 'show' : 'hide'}`} alt="loader" />
                            : <div className="modal-content deletedModal">
                                <Modal.Header bsPrefix="modalHeader" closeButton>
                                    <div className="modalHeaderLeft"></div>
                                    <Modal.Title bsPrefix="modalTitle">Are You Sure?</Modal.Title>
                                </Modal.Header>
                                <Modal.Body bsPrefix="modalBody">
                                    <span className="modalBodyText">Are you sure you want to delete this movie?</span><br></br>
                                    <span className="modalBodyTextWarning">This action cannot be undone.</span>
                                    <span>Would you like to delete the files for this movie?</span><br></br>
                                    <Button variant='outline-danger' active={this.state.deleteChecked} className='deleteFilesButton' onClick={() => this.setState({ deleteChecked: !this.state.deleteChecked })}>
                                        Yes
                                    </Button>
                                </Modal.Body>
                                <Modal.Footer bsPrefix="modalFooter">
                                    <Button className="modalButton" variant="danger" onClick={() => this.setState({ filmLoading: true, backdrop: 'static' }, this.handleDeleteClick)}>
                                        Delete
                                    </Button>
                                    <Button className="modalButton" variant="secondary" onClick={() => this.setState({ deleteChecked: false, showDeleted: false })}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </div>
                        }
                    </Modal>

                    <Modal centered contentClassName='rateModal' show={showRating} animation={false} onHide={() => this.setState({ showRating: false })}>
                        <Modal.Header bsPrefix="modalHeader" closeButton>
                            <div className="modalHeaderLeft"></div>
                            <Modal.Title bsPrefix="modalTitle">Rate {title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body bsPrefix="modalBody">
                            <span className="modalBodyText">What would you like to rate this film?</span>
                            <label className='ratingLabel' htmlFor='ratingInput'>
                                <input type='text'
                                    value={newRating}
                                    id='ratingInput'
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
                            <Button className="modalButton" variant="secondary" onClick={() => this.setState({
                                showRating: false,
                                newRating: 0, message: '', confirmDisabled: false
                            })}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>


                </div>
                <div className="commentsDiv">
                    {comments.length ? comments.map((comment) => (
                        <Comment
                            key={comment.commentid}
                            owner={comment.owner}
                            text={comment.text}
                            filename={comment.filename}
                            commentid={comment.commentid}
                            movieid={this.state.movieid}
                            added={comment.added}
                        />
                    )) : <h2 className="noComments">No comments yet.</h2>}
                    {isLoggedIn && <div className="submitCommentDiv">
                        <h2 className="submitCommentTitle">Submit a comment</h2>
                        <textarea className="commentInput" type="text"
                            value={this.state.commentText} onChange={this.handleCommentChange}></textarea>
                        <Button onClick={this.handleCommentSubmit} className="submitCommentBtn">Submit Comment</Button>
                        <h2 className="bioCharsLeft">You have {this.state.commentCharsLeft} characters left.</h2>
                    </div>}
                </div>

            </div>

        )
    }
}

export default MoviePage;
