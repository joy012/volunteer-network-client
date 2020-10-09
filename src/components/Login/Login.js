import React from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebasse.config';
import googleLogo from '../../logos/google.png';
import { useContext } from 'react';
import { UserContext } from '../../App';
import './Login.css';
import Header from '../Header/Header';
import { useHistory, useLocation } from 'react-router-dom';


const Login = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    const [user, setUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state ||{ from: { pathname: "/" } };

    const googleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider)
            .then(result => {
                const { displayName, email } = result.user;
                const signedInUser = {...user};
                signedInUser.name = displayName;
                signedInUser.email = email;
                setUser(signedInUser);
                storeAuthToken();
                history.replace(from);
            })
            .catch(error => {
            
            });
    }

    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
           sessionStorage.setItem('token', idToken);
          }).catch(function(error) {
           
          });
    }
    
    return (
        <div className='body'>
            <Header />
            <div className="text-center login mt-5">
                <div className="center px-4">
                    <h3 className="mt-5">Login With</h3>
                    <div onClick={googleSignIn} className="social-login row mt-3 mx-5 align-items-center">
                        <div className="col-3 px-1">
                            <img className='d-block mr-auto google-logo' src={googleLogo} alt="" />
                        </div>
                        <div className="col-8 px-1">
                            <span>Continue With Google</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;