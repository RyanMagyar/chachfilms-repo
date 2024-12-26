import React from 'react';
import logo from '../static/images/chachfilmsHeader.png';
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { DropdownButton } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import jwt_decode from "jwt-decode";

class Header extends React.Component {

    constructor(props) {
        super(props);
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);

        this.checkLoginToken = this.checkLoginToken.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);

        this.state = {
            isLoggedIn: userToken, user: localStorage.getItem('username'),
            toggleHeaderRerender: this.props.toggleHeaderRerender,
            showLogout: false, tokenValid: this.checkLoginToken()
        };




    }

    componentDidUpdate(previousProps) {
        if (previousProps.toggleHeaderRerender != this.props.toggleHeaderRerender) {
            const tokenString = localStorage.getItem('token');
            const userToken = JSON.parse(tokenString);
            this.setState({ isLoggedIn: userToken, user: localStorage.getItem('username') });
        }
    }

    componentDidMount(){
        this.setState({tokenValid: this.checkLoginToken()});
        if(!this.state.tokenValid){
            this.handleLogoutClick()
        }   
    }
        

    handleLogoutClick() {
        // localStorage.removeItem('token');
        // localStorage.removeItem('username');
        this.setState({ isLoggedIn: '', user: '', showLogout: false });
        this.props.handleLogout();
    }

    checkLoginToken(){
        const tokenString = localStorage.getItem('token');
        let currentDate = new Date();
        let decodedToken = {};
        let tokenValid = false;
        if (tokenString !== null){
            decodedToken = jwt_decode(tokenString);
            console.log("Dedcoded Token", decodedToken);
            if (tokenString && decodedToken.exp * 1000 < currentDate.getTime()) {
                console.log("CHECK: Token expired");
                tokenValid = false;
            } else {
                console.log("CHECK: Valid token");
                tokenValid = true;
            }
        }
        return tokenValid;
        
    }

    render() {
        console.log("HEADER RERENDER");
        return (
            <div>
                <div className="header">
                    <DropdownButton bsPrefix="navigationMenu" id="dropdown-basic-button" title='Navigation'>
                        <Dropdown.Item as={Link} to="/addmovie/" className="navigationItem">
                            Add New Movie
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to="/watched/" className="navigationItem">
                            Watched Movies
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to="/reviewers/" className="navigationItem">
                            Reviewers
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to="/statistics/" className="navigationItem">
                            Statistics
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to="/" className="navigationItem">
                            Homepage {this.state.toggleHeaderRerender}
                        </Dropdown.Item>
                    </DropdownButton>
                    <Link to='/'> <img id="logo" alt='logo' src={logo}></img> </Link>
                    {this.state.isLoggedIn ? (
                        <DropdownButton bsPrefix="profileMenu" id="dropdown-basic-button" title={this.state.user}>
                            <Dropdown.Item as={Link} to="/profile/" className="navigationItem">
                                Profile
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setState({ showLogout: true })} className="navigationItem">
                                Logout
                            </Dropdown.Item>
                        </DropdownButton>
                    ) : (
                        <Link className='header-link' id='rightItem' to='/login'>Login</Link>
                    )
                    }
                </div>
                <hr className="headerRule"></hr>


                <Modal centered contentClassName='watchedModal' show={this.state.showLogout} animation={false} onHide={() => this.setState({ showLogout: false })}>
                    <Modal.Header bsPrefix="modalHeader" closeButton>
                        <div className="modalHeaderLeft"></div>
                        <Modal.Title bsPrefix="modalTitle">Are You Sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body bsPrefix="modalBody">
                        <span className="modalBodyText">Are you sure you want to logout?</span><br></br>
                    </Modal.Body>
                    <Modal.Footer bsPrefix="modalFooter">
                        <Button className="modalButton" variant="success" onClick={this.handleLogoutClick}>
                            Yes
                        </Button>
                        <Button className="modalButton" variant="secondary" onClick={() => this.setState({ showLogout: false })}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }
};

export default Header;
