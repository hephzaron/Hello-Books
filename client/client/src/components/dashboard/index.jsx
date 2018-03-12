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
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';
import CustomBadge from './UserMenu/CustomBadge';
import UserMenu from './UserMenu';
import { connect } from 'react-redux';

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
    this.setState({isLoading:false})
  }
  render(){
    
    return(
      <Router>
        <div>
          <Header 
              heading= "HiLIB Administrator">
              <CustomBadge
                user={this.props.user}/>
              <UserMenu/>
              <Search/>
           </Header>
           <Sidebar/>
           <CenterPage/>
           <RightSidebar/>
        </div>
      </Router>
    
    )}
  }

const mapStateToProps = (state) => ({
 user: state.auth.user
})

export { Dashboard }
export default connect(mapStateToProps)(Dashboard)