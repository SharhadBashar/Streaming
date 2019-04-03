import React from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from '../Actions';

const clientId = '246638622560-t49nb41gilt8mn50k7niif9noj89ql03.apps.googleusercontent.com';

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: clientId,
                scope: 'email'
            })
            .then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        })
    }
    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        }
        else {
            this.props.signOut();
        }
    }

    onSignInClick = () => {this.auth.signIn();}
    onSignOutClick = () => {this.auth.signOut();}

    renderAuthButton() {
        if (this.props.isSignedIn === null){
            return null;
        }
        else if (this.props.isSignedIn) {
            return (
                <button className = "ui red google button" onClick = {this.onSignOutClick}>
                    <i className = "google icon" />
                    Sign Out
                </button>
            );
        } 
        else {
            return (
                <button className = "ui green google button" onClick = {this.onSignInClick}>
                    <i className = "google icon" />
                    Sign In with Google
                </button>
            );
        }
        
    }
    render() {
        return(
            <div>{this.renderAuthButton()}</div>
        );
    }
}

const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn};
};

export default connect(mapStateToProps, {
    signIn : signIn,
    signOut: signOut
})(GoogleAuth);