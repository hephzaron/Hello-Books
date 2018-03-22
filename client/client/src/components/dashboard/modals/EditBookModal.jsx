import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Modal from 'Modal/Modal';
import { closeModal } from 'Actions/modal';
import BookPage from '../pages/Book';
import { connect } from 'react-redux';

class EditBookModal extends Component {
  constructor(props){
    super(props);
    this.onClose = this.onClose.bind(this);
  }

  onClose(event){
    event.preventDefault();
    this.props.closeModal()
  }
  render(){
    return(
      <Modal onClose={this.onClose}>
        <BookPage
          editedBook = {this.props.payload}/>
      </Modal>
    )
  }
}

EditBookModal.propTypes = {
  payload: PropTypes.object.isRequired
}

const actionCreators = {
  closeModal
}

export { EditBookModal }
export default connect(null, actionCreators)(EditBookModal)