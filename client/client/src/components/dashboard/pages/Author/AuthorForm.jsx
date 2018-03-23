import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from 'Forms/Button';
import SingleInput from 'Forms/SingleInput';
import FlashMessageList from 'Components/FlashMessageList';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  validationError: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  author: PropTypes.object.isRequired,
  buttonRole: PropTypes.string.isRequired
}
/**
 * @function AuthorForm
 * @description  Renders the author form components
 * @param { object } props
 * @returns { JSX }
 */
const AuthorForm = (props) => (
  <form className="form-user" id="author-form" onSubmit = {props.onSubmit}>
    {props.editAuthorModal && <FlashMessageList/>}
    <h2>
      {props.buttonRole === 'create'? 'Create New Author':
        (props.buttonRole==='update'?'Edit Author': 
        null)}
    </h2>
    <SingleInput
      identifier = "inputFirstName"
      placeholder = "First Name"
      name = "firstName"
      label = "First Name:"
      onChange = {props.onChange}
      value = {props.author.firstName}/>
      {
        props.validationError.firstName && 
        <p className = "form-text text-danger">
          {props.validationError.firstName}
        </p>
      }
    <SingleInput
      identifier = "inputLastName"
      placeholder = "Last Name"
      name = "lastName"
      label = "Last Name:"
      onChange = {props.onChange}
      value = {props.author.lastName}/>
      {
        props.validationError.lastName && 
        <p className = "form-text text-danger">
          {props.validationError.lastName}
        </p>
      }
    <SingleInput
      identifier = "inputDateOfBirth"
      placeholder = "Date of Birth"
      name = "dateOfBirth"
      type = "date"
      label = "Date of Birth"
      onChange = {props.onChange}
      value = {props.author.dateOfBirth}/>
      {
        props.validationError.dateOfBirth && 
        <p className = "form-text text-danger">
          {props.validationError.dateOfBirth}
        </p>
      }
    <SingleInput
      identifier = "inputDateOfDeath"
      placeholder = "Date of Death"
      name = "dateOfDeath"
      type="date"
      label = "Date of Death"
      onChange = {props.onChange}
      value = {props.author.dateOfDeath}/>
      {
        props.validationError.dateOfDeath && 
        <p className = "form-text text-danger">
          {props.validationError.dateOfDeath}
        </p>
      }
    <Button
      name = {props.buttonRole}
      icon = {false}
      disabled = {props.isLoading}
      className = "btn-success"/>
  </form>
)

AuthorForm.propTypes = propTypes;

export default AuthorForm;



