import React from 'react';
import PropTypes from 'prop-types';
import Column from './Column';

/**
 * @description Renders the welcome message in a jumbotron on home page
 * @param {object} props
 * @return {void} returns nothing
 */

const propTypes = {
  welcomeMessage: PropTypes.string.isRequired,
  learnMore: PropTypes.func,
  isLoading: PropTypes.bool.isRequired
}

const Jumbotron = (props) => {
  return(
  <div className = "jumbotron">
    <Column
      colClass = "container"
      heading = "Welcome!"
      content = {props.welcomeMessage}
      onClick = {props.learnMore}
      name = "Learn more"
      isLoading = {props.isLoading}/>
  </div>
  )
}

Jumbotron.propTypes = propTypes;

export default Jumbotron;