import React from 'react';
import PropTypes from 'prop-types';
import Button from 'Forms/Button';
import SingleInput from 'Forms/SingleInput';
import FlashMessageList from 'Components/FlashMessageList';
import {Link} from 'react-router-dom';

/**
 * Reset password Modal
 * @description Renders the password reset modal component,
 *  loads the button and single input component
 * @param {object} props
 * @return {void}
 */

const propTypes = {
  onSubmit:PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  validationError: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
}

const ResetPassword = (props) => (
    <form className = "form-user" onSubmit = {props.onSubmit}>
      <FlashMessageList />
      <p className="form-user-heading">Enter your email address and we will send you a link to reset your password.</p>
        <SingleInput
          identifier = "inputEmail"
          type = "email"
          name = "email"
          placeholder = "Email address"
          label = "Email address :"
          onChange = {props.onChange}
          value = {props.user.email}/>
          {
            props.validationError.email && 
            <p className = "form-text text-danger">
              {props.validationError.email}
            </p>
          }			

		    <Button
          name = "Send password reset email"
          disabled = {props.isLoading}
          className = "btn-success"
          buttonStyle = {{
            float:'left',
            backgroundColor:'#357EC7',
            borderColor:'#357EC7',
            width:'100%'}}/>					
    </form>
        )
 ResetPassword.propTypes = propTypes;

 export default ResetPassword;
