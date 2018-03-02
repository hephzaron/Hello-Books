import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * @description resolve text field and its label into a function
 * @param {object} props
 * @returns {void}
 */

const SingleInput = (props) => (
  <div className={
    classnames(`form-group form-sm ${props.containerClass || ''}`)}>
    <label
      htmlFor={props.identifier}
      className={classnames('sr-only')}>
      {props.placeholder}
    </label>
    {props.label}
    <input
      id={props.identifier}
      type={props.type}
      name = {props.name}
      className={classnames('form-control')}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value = {props.value}
    />
  </div>
);

SingleInput.propTypes = {
  identifier: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  containerClass: PropTypes.string,
  value: PropTypes.string
};

SingleInput.defaultProps = {
  type: 'text',
  value: ''
};

export default SingleInput;