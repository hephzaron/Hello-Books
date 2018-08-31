import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CenterPageList from '../CenterPageList';
import { getAuthors, deleteAuthor } from 'Actions/authorActions';
import { showModal, closeModal } from 'Actions/modal';
import modalTypes from 'Components/Modal/modalTypes';
import {authors} from '../client-data';

const { EDIT_AUTHOR_MODAL }  = modalTypes;

class AuthorsFetchedPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      user:{},
      isLoading: false,
      authors: [...authors]
    }
  }
  componentWillReceiveProps(nextProps){
    if(this.props.authors !== nextProps.authors){
      this.setState({
        authors: [
          ...nextProps.authors
        ]
      })
    }
  }

  componentDidMount(){
    this.setState({
      isLoading:true
    });
    this.props.getAuthors()
    .then((data)=>{
      
      if(data.response && data.response.status >= 400){
        this.setState({
          isLoading:false
        });
      }
      
      this.setState({
        isLoading: false
      });
    });
  }

  onEditAuthor(author){
    this.props.showModal(EDIT_AUTHOR_MODAL, author)
  }
  onDeleteAuthor(author){
    this.props.deleteAuthor(author.id)
  }
  render(){
    return(
      <CenterPageList
        listPageClass = "author-list"
        items={this.state.authors}
        isLoading={this.state.isLoading}
        pageOffset = { 5 }
        onEditClick = {this.state.user.admin ? (author)=>this.onEditAuthor(author) : false}
        onDeleteClick = {this.state.user.admin ? (author)=>this.onDeleteAuthor(author) : false}/>
    )
  }
}

AuthorsFetchedPage.propTypes = {
  authors: PropTypes.array.isRequired
}

const mapStateToProps = (state) =>({
  authors: state.authors['authors'],
  user: state.auth['user']
})

const actionCreators = {
  getAuthors,
  deleteAuthor,
  showModal,
  closeModal
}
export { AuthorsFetchedPage }
export default connect (mapStateToProps, actionCreators)(AuthorsFetchedPage)
