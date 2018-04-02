import React, {Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Home from 'HomePage/Home';
import Register from 'HomePage/Register';
import Signin from 'HomePage/Signin';

import ResetPassword from 'HomePage/ResetPassword/ResetPasswordForm';
import logo from 'Public/images/logo.png';
import Header from 'General/Header';
import Dashboard from 'Components/dashboard';

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

/**
 * @description Renders the Landing page on user visit to site
 * @class Main 
 * @extends React.Component
 * @param {object} props
 * @return {JSX} -JSX element
 */
class Main extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: true
    }
    this.MyHomePage = this.MyHomePage.bind(this)
  }
  MyHomePage(){
    return (
      <Home 
        isLoading={this.state.isLoading}/>
    )
  }

  componentDidMount(){  
    $(".dropdown-toggle").hover(()=>{
        $(".dropdown-menu").show()
    },(event)=>{
      let target = $(event.target);
      if(target.is(".dropdwown-menu")){
        $(".dropdown-menu").hide()
      }
    })
    this.setState({isLoading:false})
  }
  render(){
    {/*Custom style for active NavLink element*/}
    const selected = {
      fontWeight:'bold',
      color:'rgb(130, 130, 233)',
      boxShadow: '0 4px 0 rgb(130, 130, 233)',
      borderRadius:'0px',
      borderStyle: 'none'
    };

    return(
      <Router>
        <div>
        {
          !this.props.isAuthenticated &&
          <Fragment>
            <Header 
              heading= "Welcome to HiLIB">
                <ul className="nav navbar-right navbar-nav " id="navbar">
                  <li><NavLink exact to = "/" activeStyle={selected} > Home</NavLink></li>
                  <li><NavLink exact to = "/signin" activeStyle={selected}> Sign In</NavLink></li>
                  <li><NavLink exact to = "/register" activeStyle={selected}>Register</NavLink></li>
                </ul>
            </Header>
            <Route exact path="/" component= {this.MyHomePage} />
            <Route  path="/signin" component= {Signin}/>
            <Route path="/register" component= {Register}/>
          </Fragment>
        }
          <Route path="/dashboard" component= { Dashboard }/>
        </div>
      </Router>
    
    )}
  }

Main.propTypes = propTypes;

const mapStateToprops = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export { Main }
export default connect(mapStateToprops)(Main)