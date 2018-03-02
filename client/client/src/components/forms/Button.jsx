import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * @description abstracts button element
 * @param {object} props
 * @return {void}
 */

const Button = (props) =>{
    return(
            <button
                className = {classnames(
                    `btn btn-lg btn-primary btn-inline ${props.className || ''}`
                )}
                type = {props.type} 
                disabled = {props.disabled}
                onClick = {props.onClick}
                style = {props.buttonStyle}>
                {props.name}
                {props.icon?
                    (<span>
                        <span className="glyphicon glyphicon-chevron-right"></span>
                        <span className="glyphicon glyphicon-chevron-right"></span>
                    </span>):''}
            </button>
        )
}

Button.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    icon: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
    buttonStyle: PropTypes.object
}

Button.defaultProps = {
    type: 'submit',
    icon: false
}

export default Button