import React from 'react';
import PropTypes from 'prop-types';
import Button from 'Forms/Button';

/**
 * @description Abstracts the column component in the jumbotron  on home page
 * @param {object} props
 * @return {JSX} returns jsx
 */

const propTypes = {
  colClass: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  name: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const Column = (props) => {
  return(
  <div className = {props.colClass}>
  {
    (props.colClass === 'container')?
    (<h1>{props.heading}</h1>):(<h2>{props.heading}</h2>)
  }
    <p>{props.content}</p>
    <Button
      className = "btn-default"
      onClick = {props.onClick}
      name = {props.name}
      disable = {props.isLoading}
      icon = {true}/>
  </div>
)
}

Column.propTypes = propTypes;

Column.defaultProps = {
  colClass: "col-md-4"
}

export default Column;