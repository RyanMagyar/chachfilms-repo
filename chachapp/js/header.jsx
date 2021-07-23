import React from 'react';
import logo from '../static/images/chachfilmsHeader.png'
import {Link} from 'react-router-dom'
import { Textfit } from 'react-textfit';


class Header extends React.Component{

    render(){
        return(
            <div>
                <div className="header">
                    <Link className='header-link' id='leftItem' to='/movies'><Textfit mode="single" forceSingleModeWidth={false}>Watched Movies</Textfit></Link>
                    <Link className='header-link' to='/reviewers'><Textfit mode="single" forceSingleModeWidth={false}>Reviewers</Textfit></Link>
                    <Link to='/'> <img id="logo" alt='logo' src={logo}></img> </Link>
                    <Link className='header-link' to='/addmovie'><Textfit mode="single" forceSingleModeWidth={false}>Add New Movie</Textfit></Link>
                    <Link className='header-link' id='rightItem' to='/login'><Textfit mode="single" forceSingleModeWidth={false}>Login</Textfit></Link>
                </div>
                <hr id="headerRule"></hr>
            </div>
            
            
        );
    }
};

export default Header;