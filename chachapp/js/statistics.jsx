import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList,LineChart, Line } from 'recharts';
import Movie from './movie'

class Statistics extends React.Component{

    constructor(props){
        super(props);
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        this.state = {isLoggedIn: userToken, averagesData: [], nullsData: [], genresData: [], userFiles : {},
                      averagesdiffData: [], latestMoviesData: [], highLowMovies: []};
    }

    componentDidMount(){
        const averagesUrl = '/api/v1/statistics/averages/';
        const nullsUrl = '/api/v1/statistics/nulls/';
        const genresUrl = '/api/v1/statistics/genres/';
        const picsUrl = '/api/v1/statistics/pics/';
        const averagesdiffUrl = '/api/v1/statistics/averagesdiff/';
        const latestMoviesUrl = '/api/v1/statistics/latestmovies/';
        const highLowMoviesUrl = '/api/v1/statistics/highlowmovies/';


        fetch(picsUrl, {
            credentials: 'same-origin',
            method: 'GET',
          })
          .then((response) => {
             if (!response.ok) {
                  throw Error(response.statusText);
              }
              return response.json();
          })
          .then((data) => {
            var userFiles = {}
            data.files.forEach(user => userFiles[user['username']] = user['filename']);
             this.setState({
                 userFiles: userFiles,
             });
          })
          .catch((error) => console.log(error))

        fetch(averagesUrl, {
            credentials: 'same-origin',
            method: 'GET',
          })
          .then((response) => {
             if (!response.ok) {
                  throw Error(response.statusText);
              }
              return response.json();
          })
          .then((data) => {
             this.setState({
                 averagesData: data.averages,
             });
          })
          .catch((error) => console.log(error))

        fetch(nullsUrl, {
            credentials: 'same-origin',
            method: 'GET',
          })
          .then((response) => {
             if (!response.ok) {
                  throw Error(response.statusText);
              }
              return response.json();
          })
          .then((data) => {
             this.setState({
                 nullsData: data.nulls,
             });
          })
          .catch((error) => console.log(error))


        fetch(genresUrl, {
            credentials: 'same-origin',
            method: 'GET',
          })
          .then((response) => {
             if (!response.ok) {
                  throw Error(response.statusText);
              }
              return response.json();
          })
          .then((data) => {
             this.setState({
                 genresData: data.genre_counts,
             });
          })
          .catch((error) => console.log(error))


        fetch(averagesdiffUrl, {
            credentials: 'same-origin',
            method: 'GET',
          })
          .then((response) => {
             if (!response.ok) {
                  throw Error(response.statusText);
              }
              return response.json();
          })
          .then((data) => {
             this.setState({
                 averagesdiffData: data.averages,
             });
          })
          .catch((error) => console.log(error))

        fetch(latestMoviesUrl, {
            credentials: 'same-origin',
            method: 'GET',
          })
          .then((response) => {
             if (!response.ok) {
                  throw Error(response.statusText);
              }
              return response.json();
          })
          .then((data) => {
             this.setState({
                 latestMoviesData: data.movies,
             });
          })
          .catch((error) => console.log(error))

          fetch(highLowMoviesUrl, {
            credentials: 'same-origin',
            method: 'GET',
          })
          .then((response) => {
             if (!response.ok) {
                  throw Error(response.statusText);
              }
              return response.json();
          })
          .then((data) => {
             this.setState({
                 highLowMovies: data.movies,
             });
          })
          .catch((error) => console.log(error))
    }

    renderCustomLabelText = ({ payload, x, y, width, height, value}) => {
        return <text x={x + width / 2} y={y} fontSize="12px" fill="white" textAnchor="middle" dy={-6}>{`${value}`}</text>;
    };

    valueAccessor = attribute => ({ payload }) => {
        return payload[attribute];
    };

    renderCustomToolTip = ({ active, payload }) => {
        if(active){
            return (
                <div className="customToolTip">
                    <div className="customTTDiv">
                        {typeof payload[0] !== 'undefined' ?
                        <div>
                            <h3 style={{color: `${payload[0].color}`}} className="ttLabel">{`${payload[0].name} : ${payload[0].payload[payload[0].name]}`}</h3>
                            <h3 style={{color: `${payload[0].color}`}} className="ttLabel">{`Movie : ${payload[0].payload['title' + payload[0].name]}`}</h3>
                            <hr></hr>
                        </div>
                        : ''}

                        {typeof payload[1] !== 'undefined' ?
                        <div>
                            <h3 style={{color: `${payload[1].color}`}} className="ttLabel">{`${payload[1].name} : ${payload[1].payload[payload[1].name]}`}</h3>
                            <h3 style={{color: `${payload[1].color}`}} className="ttLabel">{`Movie : ${payload[1].payload['title' + payload[1].name]}`}</h3>
                            <hr></hr>
                        </div>
                        : ''}
                        
                        {typeof payload[2] !== 'undefined' ?
                        <div>
                            <h3 style={{color: `${payload[2].color}`}} className="ttLabel">{`${payload[2].name} : ${payload[2].payload[payload[2].name]}`}</h3>
                            <h3 style={{color: `${payload[2].color}`}} className="ttLabel">{`Movie : ${payload[2].payload['title' + payload[2].name]}`}</h3>
                            <hr></hr>
                        </div>
                        : ''}

                        {typeof payload[3] !== 'undefined' ?
                        <div>
                            <h3 style={{color: `${payload[3].color}`}} className="ttLabel">{`${payload[3].name} : ${payload[3].payload[payload[3].name]}`}</h3>
                            <h3 style={{color: `${payload[3].color}`}} className="ttLabel">{`Movie : ${payload[3].payload['title' + payload[3].name]}`}</h3>
                        </div>    
                        : ''}
                        
                    </div>
                </div>
            );
        }

        return null;
    };

    renderHighLowMovies(){
        const { highLowMovies, userFiles } = this.state;
        const newArray = Object.keys(userFiles).map((username) => {
            return(
            <div key={username}>
                <hr></hr>
                    <h1 className="averagesTitle">{`${username}`}</h1>
                    <div className="feed">
                    { highLowMovies.map((movie) => {
                        if(movie.suggestedby == username){
                            return(
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
                                    rerenderParent=''
                                    numInRotation=''
                                    isLoggedIn=''
                                />
                                )
                            }
                        }) }
                    </div>
            </div>
            );
        })
        return(newArray);
    }

    render(){
        const { averagesData, nullsData, genresData
                , averagesdiffData, latestMoviesData
                , highLowMovies } = this.state;
 
        return(
            <div className="statisticsWrapper">
                <h1 className="statisticsTitle">Statistics</h1>
                <hr></hr>
                <div className="averagesGraphWrapper">
                    <h1 className="averagesTitle">Average of Suggested Movies</h1>
                    <ResponsiveContainer width="100%" aspect={3} >
                        <BarChart
                          width={500}
                          height={300}
                          data={averagesData}
                          margin={{
                              top: 20,
                              right: 30,
                              left: 20,
                              bottom: 5,
                          }}
                          
                        >
                        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                        <XAxis dataKey="suggestedby" fontSize={12} stroke="white" />
                        <YAxis yAxisId="left" orientation="left" fontSize={12} ticks={[0,1,2,3,4,5,6,7,8,9,10]} domain={[0, 10]}  stroke="#54d686" />
                        <YAxis yAxisId="right" orientation="right" fontSize={12} domain={[0, 'dataMax + 1']} tickCount={5} allowDecimals={false} stroke="#78acff" />
                        <Tooltip id="toolTip" wrapperStyle={{ backgroundColor: 'red', fontSize: "12px"}} />
                        <Legend wrapperStyle={{fontSize: "12px"}} />
                        <Bar yAxisId="left" dataKey="avg" label={this.renderCustomLabelText} name="Average" fill="#54d686" />
                        <Bar yAxisId="right" dataKey="count" label={this.renderCustomLabelText} name="Movies Watched" fill="#78acff" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <hr></hr>
                <div className="nullsGraphWrapper">
                    <h1 className="averagesTitle">Times Reviewer Fell Asleep</h1>
                    <ResponsiveContainer width="100%" aspect={3} >
                        <BarChart
                          width={500}
                          height={300}
                          data={nullsData}
                          margin={{
                              top: 20,
                              right: 30,
                              left: 20,
                              bottom: 5,
                          }}
                          
                        >
                        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                        <XAxis dataKey="username" fontSize={12} stroke="white" />
                        <YAxis yAxisId="left" orientation="left" allowDecimals={false} fontSize={12} stroke="#78acff" />
                        <Tooltip id="toolTip" wrapperStyle={{ fontSize: "12px"}} />
                        <Legend wrapperStyle={{fontSize: "12px"}} />
                        <Bar yAxisId="left" dataKey="count" label={this.renderCustomLabelText} name="Times Fell Asleep" fill="#78acff" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <hr></hr>
                <div className="nullsGraphWrapper">
                    <h1 className="averagesTitle">Genres Picked By Reviewer</h1>
                    <ResponsiveContainer width="100%" aspect={3} >
                        <BarChart
                          width={500}
                          height={300}
                          data={genresData}
                          margin={{
                              top: 20,
                              right: 30,
                              left: 20,
                              bottom: 5,
                          }}
                          
                        >
                        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                        <XAxis dataKey="genre" fontSize={12} stroke="white" />
                        <YAxis yAxisId="left" orientation="left" allowDecimals={false} fontSize={12} stroke="#78acff" />
                        <Tooltip id="toolTip" wrapperStyle={{ fontSize: "12px", backgroundColor: "#ccc"}} />
                        <Legend wrapperStyle={{fontSize: "12px"}} />
                        <Bar yAxisId="left" dataKey="Ryan" label={this.renderCustomLabelText} fill="#c778ff" />
                        <Bar yAxisId="left" dataKey="Justin" label={this.renderCustomLabelText} fill="#ffb378" />
                        <Bar yAxisId="left" dataKey="Marcus" label={this.renderCustomLabelText} fill="#78aaff" />
                        <Bar yAxisId="left" dataKey="Jon" label={this.renderCustomLabelText} fill="#29c443" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                
                <hr></hr>
                <div className="nullsGraphWrapper">
                    <h1 className="averagesTitle">Average Reviewer Gives to Their Movies vs Other Reviewers' Averages</h1>
                    <ResponsiveContainer width="100%" aspect={3} >
                        <BarChart
                          width={500}
                          height={300}
                          data={averagesdiffData}
                          margin={{
                              top: 20,
                              right: 30,
                              left: 20,
                              bottom: 5,
                          }}
                          
                        >
                        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                        <XAxis dataKey="suggestedby" name="Suggested By" fontSize={12} stroke="white" />
                        <YAxis yAxisId="left" orientation="left"ticks={[0,1,2,3,4,5,6,7,8,9,10]} domain={[0, 10]} allowDecimals={false} fontSize={12} stroke="#2ec429" />
                        <Tooltip id="toolTip" wrapperStyle={{ fontSize: "12px", backgroundColor: "#ccc"}} />
                        <Legend wrapperStyle={{fontSize: "12px"}} />
                        <Bar yAxisId="left" dataKey="suggested" name="Suggester Average" stackId="a" fill="#4f92ff"> 
                            <LabelList fontSize="12px" fill="white" position="center" valueAccessor={this.valueAccessor("suggested")} />  
                        </Bar>
                        <Bar yAxisId="left" dataKey="notsuggested" name="Others Average" stackId="b" fill="#ffb94f">
                            <LabelList fontSize="12px" fill="white" position="center" valueAccessor={this.valueAccessor("notsuggested")} />  
                        </Bar>
                        <Bar yAxisId="left" dataKey="diff" name="Difference" stackId="b" fill="#c233f2">
                            <LabelList fontSize="12px" fill="white" position="top" valueAccessor={this.valueAccessor("diff")} />  
                        </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <hr></hr>
                <div className="nullsGraphWrapper">
                    <h1 className="averagesTitle">Averages for 5 Latest Movies Per Reviewer</h1>
                    <ResponsiveContainer width="100%" aspect={3} >
                        <LineChart
                          width={500}
                          height={300}
                          data={latestMoviesData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                           }}
                        >
                        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                        <XAxis reversed dataKey="rank" ticks={[1,2,3,4,5]} domain={[1,5]} fontSize={12} stroke="white" />
                        <YAxis yAxisId="left" orientation="left" fontSize={12} ticks={[0,1,2,3,4,5,6,7,8,9,10]} domain={[0, 10]}  stroke="#54d686" />
                        <Tooltip id="toolTip" content={this.renderCustomToolTip} wrapperStyle={{ fontSize: "12px", backgroundColor: "#ccc"}} />
                        <Legend wrapperStyle={{fontSize: "14px"}} />
                        <Line yAxisId="left" type="monotone" dataKey="Ryan" stroke="#4f92ff"> 
                        </Line>
                        <Line yAxisId="left" type="monotone" dataKey="Marcus"stroke="#ffb94f">
                        </Line>
                        <Line yAxisId="left" type="monotone" dataKey="Justin" stroke="#c233f2">
                        </Line>
                        <Line yAxisId="left" type="monotone" dataKey="Jon" stroke="#4fff52">
                        </Line>
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <hr></hr>
                <div className="nullsGraphWrapper">
                    <h1 className="averagesTitle">Highest and Lowest Rated Movie Per User</h1> 
                    {this.renderHighLowMovies()}

                </div>
            </div>
        );
    }
};

export default Statistics;