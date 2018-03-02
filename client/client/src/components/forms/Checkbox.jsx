import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description Renders checkbox component
 * @param {object} props
 * @returns {void}
 */

const Checkbox = (props) => (
    <div className = "checkbox" >
			<label 
				style = {props.checkboxStyle}>
				<input
				 type = "checkbox" 
				 value = {props.value} 
				 onChange = {props.toggleCheckbox}
				 checked = {props.isChecked}/>
				{props.label}
			</label>
    </div>
)

Checkbox.propTypes = {
	value: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	toggleCheckbox: PropTypes.func.isRequired,
	isChecked : PropTypes.bool.isRequired,
	checkboxStyle: PropTypes.object
}

Checkbox.defaultProps = {
}
export default Checkbox;