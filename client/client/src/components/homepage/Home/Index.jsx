import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Jumbotron from './Jumbotron';
import HomeRow from './HomeRow';
import { loadModal, showModal, hideModal } from 'Actions/modal';
import modalTypes from 'Modal/modalTypes';

const { 
  MISSION_STATEMENT_MODAL, 
  VISION_STATEMENT_MODAL,
  PASSION_STATEMENT_MODAL,
  ABOUT_US_MODAL 
} = modalTypes;

/**
 * @description This renders the homepage and its other components
 * @param {object} props
 * @return {JSX}
 */

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  messageContent: PropTypes.string
}

class Home extends Component {
  constructor(props){
    super(props);

    this.message = 'This is HiLib, a shortword for Hi-library';
    this.ourMission = 'Our Mission';
    this.ourVision = 'Our Vission';
    this.ourPassion = 'Our Passion';
    this.state = {
      isLoading: false,
      messageContent: 'we are passionate about bulding a reading culture in students and ...'
    };
    this.displayMission= this.displayMission.bind(this);
    this.displayVision= this.displayVision.bind(this);
    this.displayPassion= this.displayPassion.bind(this);
    this.displayAboutUs = this.displayAboutUs.bind(this);
  };
  componentWillMount(){
    document.body.style.textAlign="center";
  }

  componentDidMount(){
    this.setState({isLoading:false});
  };
  componentWillUnmount(){
    this.setState({isLoading:true});
    document.body.style.textAlign = null;
  }

  displayMission(){
    this.props.showModal(MISSION_STATEMENT_MODAL)
  }
  displayVision(){
    this.props.showModal(VISION_STATEMENT_MODAL)
  }
  displayPassion(){
    this.props.showModal(PASSION_STATEMENT_MODAL)
  }
  displayAboutUs(){
    this.props.showModal(ABOUT_US_MODAL)
  }

  render(){
    return(    
      <div>
      {/* Main jumbotron welcomes user to hilib */}
        <Jumbotron
          welcomeMessage = {`${this.message} ${this.state.messageContent}`}
          isLoading = {this.state.isLoading}
          learnMore = {this.displayAboutUs}/> 
        <HomeRow
          missionMessage = {this.ourMission}
          visionMessage = {this.ourVision}
          passionMessage = {this.ourPassion}
          viewMission = {this.displayMission}
          viewVision = {this.displayVision}
          viewPassion = {this.displayPassion}
          isLoading = {this.state.isLoading}
          getMMYY = 'Jan, 2018'/>   
      </div>
    )
  }
  
}

Home.propTypes = propTypes;


const actionCreators = {
  loadModal,
  showModal
}



export { Home }
export default connect(null, actionCreators)(Home);
