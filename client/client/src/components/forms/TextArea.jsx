import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * @description abstracts input field for text area
 * @param {object} props
 * @returns {void} 
 */

const TextArea = (props) => (
	<div className="form-group form-sm">
		<textarea
			className={classnames(`form-control`)}
			name={props.name}
			placeholder={props.placeholder}
			value={props.value}
			onChange={props.onChange}>
		</textarea>
	</div>
)

TextArea.propTypes = {
	placeholder:PropTypes.string.isRequired,
	name:PropTypes.string.isRequired,
	value:PropTypes.string.isRequired,
	inputClass: PropTypes.string
}

export default TextArea