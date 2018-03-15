import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * @description abstracts input field for text area
 * @param {object} props
 * @returns {void} 
 */

const TextArea = ({label}) => (
	<div className="form-group form-sm">
		<textarea
			className={classnames(`form-control`)}>
			{label}
		</textarea>
	</div>
)

TextArea.propTypes = {
	label:PropTypes.string.isRequired,
	inputClass: PropTypes.string
}

export default TextArea