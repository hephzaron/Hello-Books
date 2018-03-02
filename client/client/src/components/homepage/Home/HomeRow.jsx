import React from 'react';
import PropTypes from 'prop-types';
import Column from './Column';
import Footer from 'General/Footer'

/**
 * @description Abstracts row beneath jumbotron on homepage
 * @param {object} props
 * @return {void} returns nothing
 */

const propTypes = {
  missionMessage: PropTypes.string.isRequired,
  visionMessage: PropTypes.string.isRequired,
  passionMessage: PropTypes.string.isRequired,
  viewMission: PropTypes.func,
  viewVision: PropTypes.func,
  viewPassion: PropTypes.func,
  isLoading: PropTypes.bool.isRequired,
  getMMYY: PropTypes.string.isRequired  
}

const HomeRow = (props) => {
  return(
  <div className="container">
    <div className="row">
      <Column
        heading = "Our Mission"
        content = {props.missionMessage}
        onClick = {props.viewMission}
        name = "View details"
        isLoading = {props.isLoading}/>
      <Column
        heading = "Our Vision"
        content = {props.visionMessage}
        onClick = {props.viewVision}
        name = "View details"
        isLoading = {props.isLoading}/>
    
      <Column
        heading = "Our Passion"
        content = {props.passionMessage}
        onClick = {props.viewPassion}
        name = "View details"
        isLoading = {props.isLoading}/>
    </div>
    <Footer
      mmYY = {props.getMMYY}
    />
  </div>
  )
}

HomeRow.propTypes = propTypes;

export default HomeRow;