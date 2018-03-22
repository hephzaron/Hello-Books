import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FlashMessage from './FlashMessage';
import SetTimeout from '../../helpers/SetTimeout';
import { removeFlashMessage } from 'Actions/flashMessage';

/**
 * @description Container component for flash message
 * @class FlashMessageList
 * @extends {React.Component}
 */

class FlashMessageList extends Component {
  constructor(props){
    super(props);
    this.state= {
      alertClosed: false
    }
    this.closeAlert = this.closeAlert.bind(this)
  }

 
  /**
   * @description Lifecycle method invoked when component will unmount
   * @memberof FlashMessageList
   * @method componentWillMount
   * @returns undefined
   */
  
  componentWillUnmount(){
    this.props.removeFlashMessageAction
  }

  /**
   * componentWillRecieveProps
   * @description Lifecycle method before component receives new props
   * @param { object } nextProps
   * @returns { void }
   */

   componentWillReceiveProps(nextProps){
    if(this.props.message !== nextProps.message){
      this.setState({
        alertClosed: false
      });
    }
  }
  
  
  /**
   * closeAlert
   * @description Closes alert
   * @returns {void}
   * @memberof FlashMessageList
   */

  closeAlert(){
    this.setState({
      alertClosed:true
    });
  }

  
  /**
   * @description Renders flash message component
   * @returns {JSX} - JSX
   * @memberof FlashMessageList
   */
  render () { 
    const { message } = this.props;
    if(!this.state.alertClosed){
      return (
        <SetTimeout interval = {15000}>
          {Object.keys(message).length !==0 &&
        <FlashMessage
          message = {message}
          closeAlert = {this.closeAlert}/>
        }
        </SetTimeout>
      );
    }
    return null;
  }
  
}

FlashMessageList.propTypes = {
  message: PropTypes.object,
  removeFlashMessageAction: PropTypes.func.isRequired
}

/**
 * @description Get state from store
 * @param {object} state - redux store state
 * @returns {object} mapped state
 */

 const mapStateToProps = (state) => ({
   message:state.flashMessage
 });

 export { FlashMessageList };
 export default connect(
   mapStateToProps,
   { removeFlashMessageAction: removeFlashMessage}
 )(FlashMessageList);