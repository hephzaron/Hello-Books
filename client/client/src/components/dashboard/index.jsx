import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import $ from 'jquery';
import PropTypes from 'prop-types';
import Header from 'General/Header';
import CenterPage from './CenterPage';
import Search from './Search';

/**
 * @description Renders the dashboard on successful authentication
 * @class Dashboard
 * @extends React.Component
 * @param {object} props
 * @return {JSX} -JSX element
 */
class Dashboard extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: true
    }
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
    
    return(
      <Router>
        <div>
          <Header 
              heading= "HiLIB Administrator">
           </Header>
           <div className="col-md-4"></div>
           <CenterPage/>
           <div className="col-md-2"></div>
        </div>
      </Router>
    
    )}
  }


export default Dashboard;