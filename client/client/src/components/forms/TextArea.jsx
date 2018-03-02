import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * @description abstracts input field for text area
 * @param {object} props
 * @returns {void} 
 */

const Textarea = (props) => (
	<div className="form-group form-sm">
		<textarea {...rest}>
		{props.label}
		</textarea>
	</div>
)

Textarea.propTypes = {
	label:PropTypes.string.isRequired
}

Textarea.defaultProps = {
}
export default Textarea