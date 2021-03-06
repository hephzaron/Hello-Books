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
import ErrorBoundary from '../ErrorBoundary';
import Footer from 'General/Footer';
import moment from 'moment';

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
    if(!this.props.isAuthenticated){
      return null
    }
    
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
           <div className="container-fluid">
            <div className="col-md-3">
              <Sidebar/>
            </div>
            <div className="col-md-6">
              <CenterPage/>
            </div>
            <div className="col-md-3">
              <RightSidebar/>
            </div>
            </div>
            <Footer
              mmYY={moment(Date.now()).format('MMMM YYYY')}/>
        </div>
      </Router>
    
    )}
  }

  Dashboard.propTypes = {
    user: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
  }

const mapStateToProps = (state) => ({
 user: state.auth.user,
 isAuthenticated: state.auth.isAuthenticated
})

export { Dashboard }
export default connect(mapStateToProps)(Dashboard)