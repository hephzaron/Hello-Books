import React , { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Modal from 'Modal/Modal';
import { closeModal } from 'Actions/modal';
import AuthorPage from '../pages/Author';
import { connect } from 'react-redux';

class EditAuthorModal extends Component {
  constructor(props){
    super(props);
    this.onClose = this.onClose.bind(this);
  }

  onClose(event){
    this.props.closeModal()
  }
  render(){
    return(
      <Modal onClose={this.onClose}>
        <AuthorPage
          editedAuthor = {this.props.payload}/>
      </Modal>
    )
  }
}

EditAuthorModal.propTypes = {
  payload: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired
}

export { EditAuthorModal }
export default connect(null, { closeModal })(EditAuthorModal)