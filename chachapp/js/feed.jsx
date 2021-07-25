import React from "react";
import PropTypes from 'prop-types';
import Movie from './movie'

class Feed extends React.Component {

    constructor(props){
        super(props);
        this.state = { movies: [], rerender: false};

    this.getCounts = this.getCounts.bind(this);

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
       
        console.log(url);
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

    getCounts(){
        const { numInRotation } = this.state;
        const { movies } = this.state;
        for(var person in numInRotation){
            numInRotation[person] = 0;
        }
        movies.forEach(movie => numInRotation[movie.suggestedby] = numInRotation[movie.suggestedby] + 1)
        
        this.setState({numInRotation: numInRotation});
        console.log(this.state.numInRotation);

    }

    render() {
        const { movies } = this.state;
        const { numInRotation } = this.state;
        const { url } = this.props;
        console.log(this.state.numInRotation);

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
                        rerenderParent={this.props.rerenderParent}
                        numInRotation={this.props.numInRotation}
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