import React from 'react';
import {
  BrowserRouter as Router, 
  Route, 
  Switch} from 'react-router-dom';
//import createHistory from 'history/createBrowserHistory'
import Home from 'HomePage/Home';
import Register from 'HomePage/Register';
import Signin from 'HomePage/Signin';
import ChangePassword from 'HomePage/ChangePassword/ChangePasswordForm';
import ResetPassword from 'HomePage/ResetPassword/ResetPasswordForm';
import LandingPage from 'HomePage/Landing/Main'

//const history = createHistory()

const Routes = () =>  (
    <div className="container">
        <Route exact path="/" component={LandingPage}/>
        <Route path="/home" component={Home} />
        <Route path ="/signin" component={Signin}/>
        <Route path = "/register" component={Register}/>
        <Route path = "/reset-password" component={ResetPassword}/>
    </div>
    )

export default Routes;