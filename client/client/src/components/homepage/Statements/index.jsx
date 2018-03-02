import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Statement = ({statementClass, children,...rest}) => (
    <div className="statement-content">
      <div className = "header">
        <span className= "logo-crop">
          <img src ="" alt= "logo" width="42" width="42"/>
        </span>
        <p className="header-1">
          {'THIS IS A RED HEADER'}<br/>
          <span className="header-2">
            {'I will go home'}
          </span>
        </p>
      </div>
      <div 
        className= {classnames(`childrenClass`)}
        {...rest}>
        {children}
      </div>
    </div>
)

Statement.propTypes = {
  children: PropTypes.node.isRequired,
  rest: PropTypes.object
}

export default Statement