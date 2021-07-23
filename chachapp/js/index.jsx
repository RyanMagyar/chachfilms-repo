import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main'
import { BrowserRouter } from 'react-router-dom';
import "../static/css/style.css";

ReactDOM.render(

    <BrowserRouter>
        <Main/>
    </BrowserRouter>,
    document.getElementById('reactEntry'),
);