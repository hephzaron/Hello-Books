import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'Modal/Modal';
import { closeModal } from 'Actions/modal';
import Statements from '../index';

class VisionStatement extends Component {
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
          <div id ="load-vision">Our Vision</div>
        </Statements>
      </Modal>
    )
  }
}

export {VisionStatement};
export default connect(null,{
  closeModal
})(VisionStatement);