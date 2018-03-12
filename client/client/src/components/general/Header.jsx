import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description Renders the Header component
 * @function Header
 * @param {object} props
 * @return {JSX} -JSX element
 */

const Header = (props)=> (
  <nav className="navbar navbar-default">
            <div className= "container-fluid">
              <div  className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" aria-expanded="false" aria-controls="navbar">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
              </div>
              <div className="collapse navbar-collapse" >
              <div className="navbar-left">
                <h4 style={{float:'right'}}>
                  {props.heading}
                  <span style= {{marginLeft:'100px'}}></span>
                </h4>
              </div>
                {props.children}
              </div>
            </div>
          </nav>
)

Header.propTypes = {
  children: PropTypes.node,
  heading: PropTypes.string.isRequired
}

Header.defaultProps = {
  heading: "HiLIB"
}

export default Header