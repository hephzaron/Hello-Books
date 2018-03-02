import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'Modal/Modal';
import { closeModal } from 'Actions/modal';
import Statements from '../index';

class TermsOfService extends Component {
  constructor(props){
    super(props);
    this.onClose = this.onClose.bind(this);
  }

  onClose(){
    this.props.closeModal()
  }
  render(){
    const dialogStyle = {
      backgroundColor: '#CFECEC'
    }
    
    return(
      <Modal 
        onClose= {this.onClose}
        dialogStyle={dialogStyle}>
        <Statements>
          <div id ="load-passion">HiLib Terms of Service</div>
        </Statements>
      </Modal>
    )
  }
}

export {TermsOfService};
export default connect(null,{
  closeModal
})(TermsOfService);