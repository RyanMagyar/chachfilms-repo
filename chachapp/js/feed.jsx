import React from "react";
import PropTypes from 'prop-types';
import Movie from './movie'

class Feed extends React.Component {

    constructor(props){
        super(props);
        this.state = { movies: [], rerender: false};

    }

    

    componentDidUpdate(previousProps) {
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
                });
                if(url == "/api/v1/inrotation/") this.props.getNumInRotation(this.state.movies);
            })
            .catch((error) => console.log(error));
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
                });
                if(url == "/api/v1/inrotation/") this.props.getNumInRotation(this.state.movies);
            })
            .catch((error) => console.log(error));
    }

    render() {
        const { movies } = this.state;
        const { numInRotation } = this.state;
        const { url } = this.props;

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
                        movieState={movie.state}
                        movieid={movie.movieid}
                        added={movie.added}
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