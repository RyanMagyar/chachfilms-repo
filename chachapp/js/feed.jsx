import React from "react";
import PropTypes from 'prop-types';
import Movie from './movie'
import moment from 'moment';
// This code is copyright 2012 by Gavin Kistner, !@phrogz.net
// It is covered under the license viewable at http://phrogz.net/JS/_ReuseLicense.txt

class Feed extends React.Component {

    constructor(props){
        super(props);
        this.state = { movies: [], filteredMovies: [], rerender: false, 
        sortBy: this.props.sortBy, filterBy: this.props.filterBy,
        };
        this.sortMoviesBy = this.sortMoviesBy.bind(this);
        this.dynamicSort = this.dynamicSort.bind(this);
        this.filterMoviesBy = this.filterMoviesBy.bind(this);
        this.filterMoviesBy = this.filterMoviesBy.bind(this);

    }

    componentDidUpdate(previousProps, previousState) {
        const { url } = this.props;
        if(previousProps.toggleRerender != this.props.toggleRerender){
            fetch(url)
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                
                return response.json();
            })
            .then((data) => {
                this.setState({
                    movies: data.movies,
                    filteredMovies: data.movies,
                });
                this.sortMoviesBy();
                this.filterMoviesBy();
                if(url != "/api/v1/ondeck/") this.props.getNumInRotation(this.state.movies, url);
            })
            .catch((error) => console.log(error));
        }
        else if(previousProps.sortBy != this.props.sortBy){
            this.sortMoviesBy();
        }
        else if(previousProps.filterBy != this.props.filterBy){
            this.filterMoviesBy();
        }
    }

    dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            /* next line works with strings and numbers, 
             * and you may want to customize it to your needs
             */

            if(property === "added"){
                var dateA = new Date(a[property]);
                var dateB = new Date(b[property]);
                var result = (dateA < dateB) ? -1 : (dateA > dateB) ? 1 : 0;
            } else {
                var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            }

            return result * sortOrder;
        }
    }

    sortMoviesBy() {
        const {movies} = this.state;
        this.setState({movies: movies.sort(this.dynamicSort(this.props.sortBy))}, console.log(this.state.movies));
        this.filterMoviesBy();
    }

    filterMoviesBy(){
        const filterBy = this.props.filterBy;
        var filteredMovies = this.state.movies;
        if(filterBy == ""){
            this.setState({filteredMovies: filteredMovies});
            
        } else {
            this.setState({filteredMovies: filteredMovies.filter(movie => movie.suggestedby == filterBy)});

        }

    }

    componentDidMount(){
        const { url } = this.props;
       
        fetch(url)
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                
                return response.json();
            })
            .then((data) => {
                this.setState({
                    movies: data.movies,
                    filteredMovies: data.movies,
                });
                this.sortMoviesBy();
                this.filterMoviesBy();
                if(url != "/api/v1/ondeck/") this.props.getNumInRotation(this.state.movies, url);
            })
            .catch((error) => console.log(error));
    }

    render() {
        const { movies } = this.state;
        const { filteredMovies } = this.state;
        const { numInRotation } = this.state;
        const { url } = this.props;
        var mappedMovies = []
        if(url == '/api/v1/watched/' && filteredMovies.length < movies.length){
            mappedMovies = filteredMovies

        }
        else{
            mappedMovies = movies
        }

        return (
            <div className="feed">
                {mappedMovies.map((movie) => (
                    <Movie 
                        key={movie.movieid}
                        suggestedby={movie.suggestedby}
                        year={movie.year}
                        imdbrating={movie.imdbrating}
                        title={movie.title}
                        cover={movie.filename}
                        director={movie.director}
                        movieState={movie.state}
                        movieid={movie.movieid}
                        added={movie.added}
                        ratings={movie.ratings}
                        average={movie.average}
                        genres={movie.genres}
                        rerenderParent={this.props.rerenderParent}
                        numInRotation={this.props.numInRotation}
                        isLoggedIn={this.props.isLoggedIn}
                    />
                ))}
            </div>
        )
    }
}

Feed.propTypes = {
    url: PropTypes.string.isRequired,
};

export default Feed;