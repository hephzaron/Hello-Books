import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserOptions from './UserOptions';
import { logoutUser } from 'Actions/userAuth';
import { showModal, closeModal } from 'Actions/modal';
import modalTypes from '../../Modal/modalTypes';
import PropTypes from 'prop-types';

const { CHANGE_PASSWORD_MODAL } = modalTypes;

/**
 * @class UserDropdown
 * @extends { React.Component } 
 * @description Renders the user dropdown list
 * @param { object } props
 * @returns { JSX }
 */

class UserDropdown extends Component {
  constructor(props){
    super(props)
    this.viewProfile = this.viewProfile.bind(this);
    this.signOut = this.signOut.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  /**
   * @method viewprofile
   * @memberof UserDropdown
   * @description Handles on click event to view user profile
   * @param { null }
   * @returns { void }
   */
  viewProfile(event){
    event.preventDefault();
    alert('My profile')
  }

   /**
   * @method signOut
   * @memberof UserDropdown
   * @description Handles on click event to sign user out
   * @param { null }
   * @returns { void }
   */
  signOut(event){
    event.preventDefault();
    this.props.logoutUser();
    this.context.router.history.push('/');
  }

  changePassword(event){
    event.preventDefault();
    this.props.showModal(CHANGE_PASSWORD_MODAL)
  }

  render(){
    if(this.props.isAuthenticated === false){
      return null;
    }
    return(
      <div className="btn-group dropdown">
        <UserOptions
          user={this.props.user}
          isAuthenticated={this.props.isAuthenticated}
          viewProfile = {this.viewProfile}
          signOut = {this.signOut}
          changePassword ={this.changePassword}/>
      </div>
    )
  }
}

UserDropdown.contextTypes = {
  router: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
})

const actionCreators = {
  showModal,
  closeModal,
  logoutUser
}

export { UserDropdown }

export default connect(mapStateToProps, actionCreators)(UserDropdown)