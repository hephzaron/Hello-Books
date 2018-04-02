import React, { Component } from 'react';
import  classnames from 'classnames';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { logoutUser } from 'Actions/userAuth';
import { connect } from 'react-redux';

/**
 * @class CustomBadge
 * @extends { React.Component }
 * @description Renders the user  avatar and home icon on navigation bar
 * @param { null }
 * @returns { void }
 */

class CustomBadge extends Component{
  constructor(props){
    super(props);
    this.goToHomePage = this.goToHomePage.bind(this);
  }
  goToHomePage(){
    event.preventDefault();
    this.props.logoutUser();
    this.context.router.history.goBack()
  }
  render(){
    const {
      username,
      memValue
    } = this.props.user

    const styles = {
      large:{
        padding:0,
        margin:'0 5px 0 30px'
      },
      largeIcon:{
        width:50,
        height:50,
        padding: 0,
        margin: 0,
        color: '#206581'
      }
    }
    return(
      <span className="user-avatar">
        <img 
          src={require('Public/images/user-profile.png')}
          width={50} 
          height={50}
          mode='fit'
          className={'dropdown-user-options'}/>
          <span>{username}</span>
          <MuiThemeProvider>
            <IconButton
            iconStyle={styles.largeIcon}
            style={styles.large}
            onClick={this.goToHomePage}>
            <ActionHome/>
            </IconButton>
          </MuiThemeProvider>
          <span>Home</span>
      </span>
    )
  }
}

CustomBadge.propTypes = {
  user: PropTypes.object.isRequired
}
CustomBadge.contextTypes = {
  router: PropTypes.object.isRequired
}

export { CustomBadge }
export default connect(null,{logoutUser})(CustomBadge)