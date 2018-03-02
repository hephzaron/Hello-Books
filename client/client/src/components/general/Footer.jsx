import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description Renders footer for pages
 * @param {object} props
 * @return {void} return nothing
 */

const propTypes = {
  mmYY : PropTypes.string.isRequired
}

const Footer = (props) => {
  return(
  <div>
    <hr/>
    <footer>
      <p>{`© ${props.mmYY} HiLib, Inc.`}</p>
    </footer>
  </div>
  )
};

Footer.defaultProps = {
  mmYY:'January, 2018'
}

Footer.propTypes = propTypes;

export default Footer

