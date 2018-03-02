import { Link } from 'react-router';
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'Forms/Button';
import Checkbox from 'Forms/Checkbox';
import SingleInput from 'Forms/SingleInput';
import FlashMessageList from '../../FlashMessageList/FlashMessage';

/**
 * @description Renders the change password component,
 *  loads the button and single input component
 * @param {object} props
 * @return {void}
 */

const propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  validationError: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};

const ChangePassword = (props) => {
return(
<div>
  <div>
    <h2>HiLib</h2>
    <hr/>
  </div>
  <form onSubmit = {props.onSubmit}>
    <h2 className = "form-user-heading">Please sign in</h2>
      <FlashMessageList />
      <SingleInput
        identifier = "newPassword"
        type = "password"
        placeholder = "New Password"
        label = "New Password :"
        onChange = {props.onChange}/>

      {props.validationError.newPassword &&
        <p className = "form-text text-danger">
          {props.validationError.newPassword}
        </p>
      }

      <SingleInput
        identifier = "confirmPassword"
        type = "passowrd"
        placeholder = "Confirm Password"
        label = "Confirm Password :"
        onChange = {props.onChange}/>
      {props.validationError.confirmPassword &&
        <p className = "form-text text-danger">
          {props.validationError.confirmPassword}
        </p>
      }
      <Button
        className = "btn-success"
        name = "Create"
        icon = {false}
        disabled = {props.isLoading}/>
    </form>
  </div>
    )
};

ChangePassword.propTypes = propTypes;

export default ChangePassword;
