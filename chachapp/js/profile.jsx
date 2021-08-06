import React from 'react';
import ImageCropper from './imageComponents/imageCropper';

class Profile extends React.Component{

    constructor(props){
        super(props);
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        this.state = {message: '', isLoggedIn: userToken, oldPassword: '', 
                      newPassword: '', repeatNewPassword: '', successMessage: '',
                      userProfilePic: '', editor: null, scaleValue: 1, filename: '',
                      picMessageSuccess: '', picMessageError: '',};

        this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
        this.postNewPic = this.postNewPic.bind(this);
    }

    setEditorRef = editor => this.setState({ editor });

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
                        picMessageSuccess: 'Picture upload succseful.',
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
                </div>
            );
    }
};

export default Profile;