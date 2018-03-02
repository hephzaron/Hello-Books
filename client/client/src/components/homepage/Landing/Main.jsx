import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import $ from 'jquery';
import PropTypes from 'prop-types';

import Home from 'HomePage/Home';
import Register from 'HomePage/Register';
import Signin from 'HomePage/Signin';
import Paginate from 'HomePage/Paginate';

import ChangePassword from 'HomePage/ChangePassword/ChangePasswordForm';
import ResetPassword from 'HomePage/ResetPassword/ResetPasswordForm';
import ServiceDropdown from './DropdownMenu';
import  ModalContainer  from 'Components/Modal';
import logo from 'Public/images/logo.png'

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
          <nav className="navbar navbar-default">
            <div className= "container-fluid">
              <div  className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" aria-expanded="false" aria-controls="navbar">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
              </div>
              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-l">
              <div className="navbar-left">
              {/**<div style={{
                width:'50px', 
                height:'50px',
                margin:'0px',
                float:'left',
                overflow:'hidden'}}>
                <img src={logo} width="130px" height="100px" />
              </div>    **/}
                <h4 style={{float:'right'}}>
                  {`Welcome to HiLib  `}
                  <span style= {{marginLeft:'100px'}}></span>
                </h4>
              </div>
                <ServiceDropdown/>
                <ul className="nav navbar-right navbar-nav " id="navbar">
                  <li><NavLink exact to = "/" activeStyle={selected} > Home</NavLink></li>
                  <li><NavLink exact to = "/signin" activeStyle={selected}> Sign In</NavLink></li>
                  <li><NavLink exact to = "/register" activeStyle={selected}>Register</NavLink></li>
                  <li><NavLink exact to = "/api-docs" activeStyle={selected}>API Docs</NavLink></li>
                </ul>
              </div>
            </div>
          </nav>
          <Route exact path="/" component= {this.MyHomePage} />
          <div className="route-container">
          <Route exact path="/signin" component= {Signin}/>
          <Route exact path="/register" component= {Register}/>
          <Route exact path="/api-docs" component = {Paginate}/>
          <ModalContainer />
          </div>
        </div>
      </Router>
    
    )}
  }


export default Main;