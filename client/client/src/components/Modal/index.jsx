import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import modalTypes from './modalTypes';

{/* import custom modal components*/}
import PasswordResetModal from 'HomePage/ResetPassword';
import TermsOfServiceModal from 'HomePage/Statements/Terms';
import MissionStatementModal from 'HomePage/Statements/Mission';
import VisionStatementModal from 'HomePage/Statements/Vision';
import PassionStatementModal from 'HomePage/Statements/Passion';
import AboutUsModal from 'HomePage/Statements/About';

{/*import form modals*/}
import EditBookModal from '../dashboard/modals/EditBookModal';

const MODAL_COMPONENTS = {
  RESET_PASSWORD_MODAL: PasswordResetModal,
  TERMS_OF_SERVICE_MODAL: TermsOfServiceModal,
  MISSION_STATEMENT_MODAL: MissionStatementModal,
  VISION_STATEMENT_MODAL: VisionStatementModal,
  PASSION_STATEMENT_MODAL: PassionStatementModal,
  ABOUT_US_MODAL: AboutUsModal,
  EDIT_BOOK_MODAL: EditBookModal
}

const contextTypes = {
  router: PropTypes.object.isRequired
};

const propTypes = {
  modalType: PropTypes.string.isRequired
}

/**
 * @description - Custom modal component
 * @param {object} - props
 * @returns {JSX} - custom modal component to be rendered
 */
class ModalContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalPayload: {}
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.state.modalPayload !== nextProps.payload){
      this.setState({
        modalPayload: Object.assign({},
          this.state.modalPayload,
          nextProps.payload)
      })
    }
  }
  
  render(){
      if(!this.props.modalType){
        return null
      }
      const SpecificModal = MODAL_COMPONENTS[this.props.modalType]; 
        return(
          <div>
            <SpecificModal
              payload = {this.state.modalPayload}/>
          </div>
      );
    }
};

ModalContainer.contextTypes = contextTypes;

ModalContainer.propTypes = propTypes;

const mapStateToProps = state => ({
  modalType: state.modal.modalType,
  payload: state.modal.payload
})

export default connect(mapStateToProps)(ModalContainer);

