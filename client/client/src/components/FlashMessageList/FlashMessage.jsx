import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Renders a component
 * @description Renders flash message based on input supplied
 * @param {objects} props
 * @returns {string} HTML markup of component
 */

const FlashMesssage = ({ message, closeAlert })=>{
  const {type, text} = message;
  return (
    <div className = {classnames('alert fade in',{
        'alert-info': type === 'info',
        'alert-danger': type === 'error',
        'alert-success': type === 'success'
    })}>
    <span onClick={closeAlert} className="close" data-dismiss="alert">&times;</span>
      {
				Array.isArray(text) && text.length>1 &&
					<ul>
						{text.map((value,index) => 
						<li key={index}>{value}</li>)}
					</ul>                     
			}
			{(text.length === 1 || typeof(text)==='string') && <span>{text}</span>}
    </div>
    );
};

FlashMesssage.propTypes = {
  message: PropTypes.object.isRequired,
  closeAlert: PropTypes.func.isRequired
}


export default FlashMesssage;