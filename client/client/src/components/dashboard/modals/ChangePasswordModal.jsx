import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Button from 'Forms/Button';
import SingleInput from 'Forms/SingleInput';
import FlashMessageList from 'Components/FlashMessageList';
import validateUser from 'Utils/validators/user';
import { changePassword } from 'Actions/userAuth';
import Modal from 'Modal/Modal';
import { closeModal } from 'Actions/modal';


const contextTypes = {
  router: PropTypes.object.isRequired
};
const propTypes = {
  changePassword: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
}

/**
 * @class ChangePasswordModal
 * @extends { React.Component }
 * @description Renders a Change Password Form in a modal
 * @param { object} props
 * @returns { JSX }
 */
class ChangePasswordModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      user:{
        password:'',
        confirmPassword: ''
      },
      isLoading: false,
      errors: {}
    }
    this.onChange  = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  /**
   * @method onChange
   * @memberof ChangePasswordModal
   * @description Handles onChange event
   * @param { event } event 
   * @returns { void }
   */

  onChange(event){
    event.preventDefault();
    this.setState({
      user:{
        ...this.state.user,
        [event.target.name]: event.target.value
      }
    })
  }

  /**
   * @description This validate user entries
   * @param {void} 
   * @returns { boolean } isValid
   * @memberof ChangePasswordModal
   */

  isFormValid(){
    const { errors, isValid } = validateUser(this.state.user,'change-password');
    if(!isValid){
      this.setState({errors});
    }
    return isValid;
  };

  /**
   * @method onSubmit
   * @memberof ChangePasswordModal
   * @description Handles onSubmit event
   * @param { event } event 
   * @returns { void }
   */

  onSubmit(event){
    event.preventDefault();
    const { password, confirmPassword } = this.state.user;

    this.setState({
      isLoading:true
    });

    if(!this.isFormValid()){ 
      this.setState({
        isLoading:false
      });
      return
    }

    this.props.changePassword({
      newPassword: password,
      confirmPassword
    })
    .then((data)=>{
      if(data.response && data.response.status>=400){
        this.setState({isLoading:false})
      }else{
        document.getElementById('change-password-form').reset();
        this.onClose();
        this.context.router.history.push('/signin');
      }
    })
  }

  onClose(){
    this.props.closeModal()
  }
  render(){
    if(this.props.isAuthenticated === false){
      return null;
    }
    return (
      <Modal onClose={this.onClose}>
      <form className="form-user" id="change-password-form" onSubmit = {this.onSubmit}>
        <FlashMessageList/> 
        <h2>Change Password</h2>
        <SingleInput
          identifier = "password"
          placeholder = "New password"
          name = "password"
          label = "New Password:"
          onChange = {this.onChange}
          value = {this.state.user.password}/>
          {
            this.state.errors.password && 
            <p className = "form-text text-danger">
              {this.state.errors.password}
            </p>
          }
        <SingleInput
          identifier = "confirmPassword"
          placeholder = "Confirm password"
          name = "confirmPassword"
          label = "Confirm password:"
          onChange = { this.onChange }
          value = { this.state.user.confirmPassword }/>
          {
            this.state.errors.confirmPassword && 
            <p className = "form-text text-danger">
              { this.state.errors.confirmPassword }
            </p>
          }
        <Button
          className = "btn-success"
          name = "Change my password"
          icon = {false}
          disabled = {this.state.isLoading}/>
      </form>
     </Modal>
    )
  }
}

ChangePasswordModal.contextTypes = contextTypes;

ChangePasswordModal.propTypes = propTypes;

const mapStateToProps = ( state ) =>({
  isAuthenticated: state.auth.isAuthenticated
})

const actionCreators = {
  changePassword,
  closeModal
}

export { ChangePasswordModal }
export default connect (mapStateToProps, actionCreators)(ChangePasswordModal);