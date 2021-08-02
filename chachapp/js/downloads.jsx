import React from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';

class Downloads extends React.Component {
  constructor(props) {
    super(props);
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    this.state = {
      isLoggedIn: userToken, results: [], message: '',
    };
    this.fetchDownloadQueue = this.fetchDownloadQueue.bind(this);
  }

  componentDidMount() {
    this.fetchDownloadQueue();
    this.interval = setInterval(this.fetchDownloadQueue, 60000);
  }

  componentWillUnmount(){
      clearInterval(this.interval);
  }

  fetchDownloadQueue(){
    const downloadsUrl = `/api/v1/downloads/`;
    const {isLoggedIn} = this.state;

    fetch(downloadsUrl, {
        credentials: 'same-origin',
        method: 'GET',
        headers: {"authorization": `Bearer ${isLoggedIn}`},
    })
    .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        
        return response.json();
    })
    .then((data) => {
        const noResults = !data.data.length ?
            'No more search results.' : '';
        this.setState({
            results: data.data,
            message: noResults});
    })
    .catch((error) => console.log(error))
  }

  renderQueue = () => {
    const {results} = this.state;
    if (Object.keys(results).length && results.length) {
        return (
            <div className="queueContainer">
                {results.map((result) => {
                    return (
                        <div key={result.movieId} className="queueItem">
                            <h2 className="queueItemTitle">{result.title}</h2>
                            <h2 className="queueItemTitle">Quality: {result.quality.quality.name}</h2>
                            <h2 className="queueItemTitle">Time Left: 
                             {result.timeleft ? result.timeleft : ' No Time Estimate'}
                            </h2>
                            <h2 className="queueItemTitle">
                                Download: {((result.size - result.sizeleft) / 1000000000).toFixed(2)}/
                                {(result.size / 1000000000).toFixed(2)} GB 
                                ({100-(((result.sizeleft/result.size)*100)).toFixed(0)}%)
                            </h2>
                        </div>
                    );
                    
                })}
            </div>
        );
    }
  }

  render() {
    const { message } = this.state;

    return (
      <div className="downloadsWrapper">
        <h1 className="downloadsHeading" >Current Downloads:</h1>
        {this.renderQueue()}
      </div>
    );
  }
};

export default Downloads;