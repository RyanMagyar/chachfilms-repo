import React from 'react';
import axios from 'axios';
import Loader from '../static/images/loader.gif'
import FilmLoader from '../static/images/filmLoader.gif'
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";





class AddMovie extends React.Component {

    constructor(props) {
        super(props);
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        this.state = {
            query: '', results: {}, loading: false,
            message: '', showAddMovie: false, currentResult: {},
            isLoggedIn: userToken, filmLoading: false, backdrop: true,
            user: localStorage.getItem('username'), showAlert: true,
            movieids: [],
        };


        this.getMovieIds = this.getMovieIds.bind(this);
        this.handleOnInputChange = this.handleOnInputChange.bind(this);
        this.fetchSearchResults = this.fetchSearchResults.bind(this);
        this.handleAddMovie = this.handleAddMovie.bind(this);


    }

    componentDidMount() {
        this.getMovieIds();
    }

    handleAddMovie() {
        const { isLoggedIn,
            currentResult,
            user } = this.state;
        const addMovieUrl = `/api/v1/u/${user}/addmovie/`;

        fetch(addMovieUrl, {
            credentials: 'same-origin',
            method: 'POST',
            headers: {
                "authorization": `Bearer ${isLoggedIn}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ movie: currentResult }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                } else {
                    const movieid = currentResult.imdbId.replace('tt', '');
                    var newMovieIds = this.state.movieids;
                    newMovieIds.push(movieid);
                    this.setState({
                        showAddMovie: false,
                        filmLoading: false,
                        backdrop: true,
                        currentResult: {},
                        results: {},
                        query: '',
                        message: 'Movie added succesfully!',
                        movieids: newMovieIds,
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

    getMovieIds() {
        const { isLoggedIn, } = this.state;
        const getMovieIdsUrl = `/api/v1/getMovieIds/`;

        axios
            .get(getMovieIdsUrl,
                {
                    credentials: 'same-origin',
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${isLoggedIn}`,
                        'Content-Type': 'application/json'
                    }
                })
            .then((response) => {
                const data = response.data
                data.access_token && localStorage.setItem('token', JSON.stringify(data.access_token));
                var stringArray = data.movieids.map(movieid => movieid['movieid'])
                this.setState({
                    movieids: stringArray,
                });
            })
            .catch((error) => {
                console.log(error);
            });

    }

    handleOnInputChange = (e) => {
        const query = e.target.value;

        if (!query) {
            this.setState({ query, results: {}, message: '' });
        } else {
            this.setState({ query, loading: true, message: '' },
                () => { this.fetchSearchResults(1, query); }
            );
        }
    };


    fetchSearchResults = (updatedPageNo = '', query) => {
        // const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=f5b9735057a630e47e4eec010054dd7a&query=${query}&page=${pageNumber}`
        const searchUrl = `/api/v1/search/?query=${query}`;
        const { isLoggedIn } = this.state;
        if (this.cancel) {
            this.cancel.cancel()
        }

        this.cancel = axios.CancelToken.source();

        axios
            .get(searchUrl,
                {
                    cancelToken: this.cancel.token,
                    credentials: 'same-origin',
                    method: 'GET',
                    headers: {
                        "authorization": `Bearer ${isLoggedIn}`,
                        'Content-Type': 'application/json'
                    }
                })
            .then((response) => {
                const noResults = !response.data.data.length ?
                    'No more search results.' : '';
                const data = response.data
                data.access_token && localStorage.setItem('token', JSON.stringify(data.access_token));

                this.setState({
                    results: data.data,
                    message: noResults,
                    loading: false,
                });
            })
            .catch((error) => {
                if (axios.isCancel(error) || error) {
                    this.setState({
                        loading: false,
                        message: '',
                    });

                }
            });
    };

    renderSearchResults = () => {
        const { results, movieids } = this.state;
        if (Object.keys(results).length && results.length) {
            return (
                <div className="results-container">
                    {results.map((result) => {
                        return (
                            <div key={result.tmdbId} className="movieResult">
                                <div className="image-wrapper">
                                    {result.remotePoster ?
                                        <img className="newMovieImage" src={result.remotePoster} alt={result.title} />
                                        : <h1 className="resultNoPoster">No Poster Available</h1>}
                                </div>
                                <div className="resultContent">
                                    <div className="resultHeader">
                                        <h6 className="resultTitle">{result.title}</h6>
                                        {
                                            result.imdbId ?
                                                movieids.includes(result.imdbId.replace('tt', '')) ? <Button className="addMovieButton" variant="info">Added</Button>
                                                    :
                                                    <Button variant="success" className="addMovieButton" onClick={() => this.setState({
                                                        showAddMovie: true, currentResult: result,
                                                    })}>Add Movie</Button>
                                                :
                                                <Button variant="success" className="addMovieButton" onClick={() => this.setState({
                                                    showAddMovie: true, currentResult: result,
                                                })}>Add Movie</Button>
                                        }

                                    </div>
                                    <div className="resultOverview">
                                        {result.overview}
                                    </div>
                                    <h6 className="resultReleased">Release: {result.inCinemas ? (result.inCinemas).replace("T00:00:00Z", "") : ""}</h6>
                                    <h6 className="resultRating">Rating: {result.ratings.value}</h6>
                                    <div className="resultGenres">Genres: {result.genres.map((genre =>
                                        <div key={result.imdbId + genre} className="resultGenre">{genre}</div>
                                    ))
                                    }</div>

                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        }
    }

    render() {
        const {
            query,
            message,
            loading,
            showAddMovie,
            filmLoading,
            backdrop
        } = this.state;

        return (
            <div>

                <div className='searchContainer'>

                    <h1 className='searchHeading'> Search for New Movie</h1>
                    <label className='searchLabel' htmlFor='searchInput'>
                        <input type='text'
                            value={query}
                            id='searchInput'
                            placeholder='Search for Movie...'
                            onChange={this.handleOnInputChange}
                        />
                    </label>


                    {message && <p className="resultMessage">{message}</p>}

                    <img src={Loader} className={`search-loading ${loading ? 'show' : 'hide'}`} alt="loader" />
                    {this.renderSearchResults()}

                </div>

                <Modal backdrop={backdrop} centered contentClassName='addedModal' show={showAddMovie} animation={false} onHide={() => this.setState({ showAddMovie: false })}>
                    {filmLoading ?
                        <img src={FilmLoader} className={`film-loading ${filmLoading ? 'show' : 'hide'}`} alt="loader" />
                        : <div className="modal-content addedModal">
                            <Modal.Header bsPrefix="modalHeader" closeButton>
                                <div className="modalHeaderLeft"></div>
                                <Modal.Title bsPrefix="modalTitle">Are You Sure?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body bsPrefix="modalBody">
                                <span className="modalBodyText">This movie will be added to your on deck.</span><br></br>
                                <span className="addMovieText">Are you sure you want to add this movie?</span>
                            </Modal.Body>
                            <Modal.Footer bsPrefix="modalFooter">
                                <Button className="modalButton" variant="success" onClick={() => this.setState({ filmLoading: true, backdrop: 'static' }, this.handleAddMovie)}>
                                    Add Movie
                                </Button>
                                <Button className="modalButton" variant="secondary" onClick={() => this.setState({ showAddMovie: false })}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </div>
                    }
                </Modal>
            </div>

        );
    }


};

export default AddMovie;
