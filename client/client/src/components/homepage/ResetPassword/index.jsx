import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PasswordResetForm from './ResetPasswordForm';
import { closeModal } from 'Actions/modal';
import { sendResetPasswordMail as resetPasswordAction } from 'Actions/userAuth';
import { addFlashMessage } from 'Actions/flashMessage';
import validateUser from 'Utils/validators/user';
import Modal from 'Modal/Modal';

/**
 * @description Renders the Password reset modal
 * @class { PasswordResetModal }
 * @extends { Component }
 * @returns { object } - JSX
 */

class PasswordResetModal extends Component {

  /**
   * Constructor creates aan instance of PasswordResetModal
   * @memberof { PasswordResetModal }
   * @param { object } - props
   */

  constructor(props){

    super(props);
    this.state = {
      user:{
        email: ''
      },
      isLoading: false,
      errors: {}
    }
    this.onClose = this.onClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillUnmount(){
    //this.context.router.push('/signin');
  }

  onClose(){
    this.props.closeModal()
  }

  onSubmit( event ){
    event.preventDefault();
    
    if(!this.isFormValid()){
      return;
    }
    alert(this.state.user.email);
    this.setState({isLoading:true});
    this.props.resetPasswordAction(this.state.user).then(
      (data) => {
        this.setState({
          isLoading:false
        });
        this.props.addFlashMessage({
          text: data.data.message,
          type: 'success'
        });
      },

      (errors) => {
        this.setState({
          isLoading: false
        });
        if (errors.response) {
          this.props.addFlashMessage({
            type: 'error',
            text: errors.response.data
          });
        }
      }
    );
  }

  onChange(event){
    this.setState({
      user:{
        ...this.state.user,
        [event.target.name] : event.target.value
      }
    });
  }

  
  /**
   * @description This validate user entries
   * @method isFormValid
   * @param {void} 
   * @returns {boolean} isValid
   * @memberof {PasswordResetModal}
   */
  isFormValid(){
    const { errors, isValid } = validateUser(this.state.user,'reset-password');
    if(!isValid){
      this.setState({errors});
    }
    return isValid;
  };
  render(){
    return(
      <Modal onClose={this.onClose}>
        <PasswordResetForm
          onSubmit = {this.onSubmit}
          onChange = {this.onChange}
          isLoading = {this.state.isLoading}
          validationError = {this.state.errors}
          user = {this.state.user}/>
      </Modal>
    );
  }
}
const propTypes = {
  resetPasswordAction: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
}
const contextTypes = {
  router: PropTypes.object.isRequired
};

PasswordResetModal.contextTypes = contextTypes;
PasswordResetModal.propTypes = propTypes;

export { PasswordResetModal }

export default connect(null,{
  addFlashMessage,
  resetPasswordAction,
  closeModal
})(PasswordResetModal);