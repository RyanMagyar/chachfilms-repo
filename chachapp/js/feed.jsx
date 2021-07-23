import React from "react";
import PropTypes from 'prop-types';
import Movie from './movie'

class Feed extends React.Component {

    constructor(props){
        super(props);
        this.state = { movies: [] };
    }

    componentDidMount() {
        const { url } = this.props;

        fetch(url)
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                
                return response.json();
            })
            .then((data) => {
                this.setState({
                    movies: data.movies,
                });
            })
            .catch((error) => console.log(error));
    }

    render() {
        const { movies } = this.state;

        return (
            <div className="feed">
                {movies.map((movie) => (
                    <Movie 
                        key={movie.movieid}
                        suggestedby={movie.suggestedby}
                        year={movie.year}
                        imdbrating={movie.imdbrating}
                        title={movie.title}
                        cover={movie.filename}
                        director={movie.director}
                        state={movie.state}
                        movieid={movie.movieid}



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