import React from 'react';
import ImageCropper from './imageComponents/imageCropper';
import { Button } from 'react-bootstrap';

class Profile extends React.Component{

    constructor(props){
        super(props);
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        this.state = {message: '', isLoggedIn: userToken, oldPassword: '', 
                      newPassword: '', repeatNewPassword: '', successMessage: '',
                      userProfilePic: '', editor: null, scaleValue: 1, filename: '',
                      picMessageSuccess: '', picMessageError: '', bio: '',
                      bioErrorMessage: '', bioSuccessMessage: '', bioCharsLeft: 256,};


        this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
        this.postNewPic = this.postNewPic.bind(this);
        this.getBio = this.getBio.bind(this);
        this.handleBioChange = this.handleBioChange.bind(this);
        this.handleBioSubmit = this.handleBioSubmit.bind(this);
    }

    componentDidMount(){
        this.getBio();
    }

    setEditorRef = editor => this.setState({ editor });
    
    handleBioSubmit(){
       const { bio,
            isLoggedIn } = this.state;

       fetch('/api/v1/accounts/submitbio/', {
            credentials: 'same-origin',
            method: 'POST',
            headers: {
            "authorization": `Bearer ${isLoggedIn}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bio: bio}),
        })
            .then((response) => {
                if (!response.ok) {
                    response.json().then((data) => {
                        this.setState({bioErrorMessage: data.message})
                    })
                    throw Error(response.statusText);
                } else {
                    this.setState({
                               bioSuccessMessage: 'Bio change succesful.',
                               bioErrorMessage: '',});
                }
                return response.json();
            })
            .catch((error) => console.log(error))

 
    }

    handleBioChange(event){
        var input = event.target.value;
        if(input.length <= 256){
            this.setState({
                bioCharsLeft: 256 - input.length,
                bio: input,
            });
        }
    }

    getBio(){
        const { isLoggedIn } = this.state;
         fetch('/api/v1/accounts/getbio/', {
            credentials: 'same-origin',
            method: 'GET',
            headers: {
            "authorization": `Bearer ${isLoggedIn}`,
            'Content-Type': 'application/json',
        },
        })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                this.setState({
                    bio: data.bio,
                    bioCharsLeft: 256 - data.bio.length,
                });
            })
            .catch((error) => console.log(error))
    }

    handlePasswordSubmit(event){
        const { newPassword } = this.state;
        const { oldPassword } = this.state;
        const { repeatNewPassword } = this.state;
        const { isLoggedIn } = this.state;

        const loginUrl = "/api/v1/accounts/password/";


        fetch(loginUrl, {
            credentials: 'same-origin',
            method: 'POST',
            headers: {
            "authorization": `Bearer ${isLoggedIn}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldPassword: oldPassword, 
                               newPassword: newPassword,
                               repeatNewPassword: repeatNewPassword }),
        })
            .then((response) => {
                if (!response.ok) {
                    response.json().then((data) => {
                        this.setState({message: data.message})
                    })
                    throw Error(response.statusText);
                } else {
                    this.setState({newPassword: '',
                               oldPassword: '',
                               repeatNewPassword: '',
                               successMessage: 'Password change succesful.',
                               message: '',});
                }
                return response.json();
            })
            .catch((error) => console.log(error))

            event.preventDefault();

    }

    onCrop = () => {
        const { editor } = this.state;
        if (editor !== null) {
          const url = editor.getImageScaledToCanvas().toDataURL();
          this.setState({ userProfilePic: url}, this.postNewPic(url));
        }
      };
    
    onScaleChange = (scaleChangeEvent) => {
        const scaleValue =  parseFloat(scaleChangeEvent.target.value);
        this.setState({ scaleValue });
    };

    postNewPic(url) {
        const userProfilePic = url
        const { isLoggedIn } = this.state;
        const {filename } = this.state;
        const postPicUrl = "/api/v1/accounts/picture/";

        fetch(postPicUrl, {
            credentials: 'same-origin',
            method: 'POST',
            headers:{
            "authorization": `Bearer ${isLoggedIn}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename: filename, file: userProfilePic}), })
            .then((response) => {
                if (!response.ok) {
                    response.json().then((data) => {
                        this.setState({picMessageError: data.message})
                    })
                    throw Error(response.statusText);
                } else {
                    this.setState({
                        picMessageError: '',
                        picMessageSuccess: 'Picture upload successful.',
                        scaleValue: 1,
                        userProfilePic: '',
                        selectedImage: null,
                    })
                }
                return response.json();
            })
            .catch((error) => console.log(error))

    }

    profilePicChange = (fileChangeEvent) => {
        const file = fileChangeEvent.target.files[0];
        const { type } = file;
        if (!(type.endsWith('jpeg') || type.endsWith('png') || type.endsWith('jpg') || type.endsWith('gif'))) {
        } else {
          this.setState({ filename: file.name, openCropper: true, selectedImage: fileChangeEvent.target.files[0], fileUploadErrors: [] });
        }
    };

    render(){
        const { message } = this.state;
        const { successMessage } = this.state;

            return(
                <div className="login-wrapper">
                    <h1 className="loginError">{message}</h1>
                    <h1 className="passwordSuccess">{successMessage}</h1>
                    <h1 className="loginHeading">Change Password</h1>
                    <form onSubmit={this.handlePasswordSubmit}>
                        <div className="passwordsLabel">
                            <label htmlFor="password">Old Password</label>
                            <input className="loginInput" type="password" value={this.state.oldPassword} onChange={e => this.setState({oldPassword: e.target.value})} />
                            <label htmlFor="newPassword">New Password</label>
                            <input className="loginInput" type="password" value={this.state.newPassword} onChange={e => this.setState({newPassword: e.target.value})} />
                            <label htmlFor="newPassword">Repeat New Password</label>
                            <input className="loginInput" type="password" value={this.state.repeatNewPassword} onChange={e => this.setState({repeatNewPassword: e.target.value})} />

                            <button className="loginButton" type="submit">Submit</button>
                        </div>
                    </form>
                    <hr className="headerRule"></hr>
                    <h1 className="loginHeading">Edit Profile Picture</h1>
                    <div className="pic-wrapper">
                        <input type="file" className="fileInput" name="profilePicBtn" accept="image/png, image/jpeg" onChange={this.profilePicChange} />
                        <ImageCropper
                            imageSrc={this.state.selectedImage}
                            setEditorRef={this.setEditorRef}
                            onCrop={this.onCrop}
                            scaleValue={this.state.scaleValue}
                            onScaleChange={this.onScaleChange}
                        />
                        <h1 className="loginError">{this.state.picMessageError}</h1>
                        <h1 className="passwordSuccess">{this.state.picMessageSuccess}</h1>
                    </div>
                    <hr className="headerRule"></hr>
                    <div className="editBioWrapper">
                        <h1 className="loginHeading">Edit User Bio</h1>
                        <textarea className="bioInput" type="text" value={this.state.bio} onChange={this.handleBioChange}></textarea>
                        <h2 className="bioCharsLeft">You have {this.state.bioCharsLeft} characters left.</h2>
                        <Button onClick={this.handleBioSubmit} className="bioBtn">Save Bio</Button>
                        <h1 className="loginError">{this.state.bioErrorMessage}</h1>
                        <h1 className="passwordSuccess">{this.state.bioSuccessMessage}</h1>
                        <div className="gap-30"></div>
                    </div>
                </div>
            );
    }
};

export default Profile;