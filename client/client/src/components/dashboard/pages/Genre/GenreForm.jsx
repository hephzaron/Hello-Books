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
  genre: PropTypes.object.isRequired
}

const GenreForm = (props) => (
  <form className="form-user" id="genre-form" onSubmit = {props.onSubmit}>
    <h2>
      {`Create Book Genre`}
    </h2>
    <SingleInput
      identifier = "inputName"
      placeholder = "Genre Name"
      name = "name"
      label = "Genre Name:"
      onChange = {props.onChange}
      value = {props.genre.name}/>
      {
        props.validationError.name && 
        <p className = "form-text text-danger">
          {props.validationError.name}
        </p>
      }
    <Button
      name = {'Create'}
      icon = {false}
      disabled = {props.isLoading}
      className = "btn-success"/>
  </form>
)

GenreForm.propTypes = propTypes;

export default GenreForm;



