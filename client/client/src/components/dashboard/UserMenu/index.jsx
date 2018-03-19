import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserOptions from './UserOptions';
import { logoutUser } from 'Actions/userAuth';

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
    this.state = {
      isAuthenticated: false
    }
    this.viewProfile = this.viewProfile.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  /**
   * @method viewprofile
   * @memberof UserDropdown
   * @description Handles on click event to view user profile
   * @param { null }
   * @returns { void }
   */
  viewProfile(){
    alert('My profile')
  }

   /**
   * @method signOut
   * @memberof UserDropdown
   * @description Handles on click event to sign user out
   * @param { null }
   * @returns { void }
   */
  signOut(){
    this.props.logoutUser()
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
          viewProfile = {this.props.viewProfile}
          signOut = {this.props.signOut}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
})

const actionCreators = {
  logoutUser
}

export { UserDropdown }

export default connect(mapStateToProps, actionCreators)(UserDropdown)