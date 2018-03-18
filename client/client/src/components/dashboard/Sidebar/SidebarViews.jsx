import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { getBooks } from 'Actions/bookActions';
import { getAuthors } from 'Actions/authorActions';
import { fetchGenres } from 'Actions/genreActions';
import { loadPage, showPage, hidePage } from 'Actions/centerPage';
import pageTypes from '../CenterPage/pageTypes';

const {
    BOOKS_FETCHED_PAGE,
    AUTHORS_FETCHED_PAGE,
    GENRES_FETCHED_PAGE 
  } = pageTypes;


class SidebarViews extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoading: false
    }

    this.viewCategories = this.viewCategories.bind(this);
    this.viewBooks = this.viewBooks.bind(this);
    this.viewAuthors = this.viewAuthors.bind(this);
  }

  viewCategories(event){
    event.preventDefault();

    this.setState({ isLoading: true });
    this.props.fetchGenres()
      .then((data)=>{
      if(data.response && data.response.status >= 400){
        this.setState({
          isLoading:false
        });
      }else{
        this.props.showPage(GENRES_FETCHED_PAGE)
      }
    })
  }

  viewBooks(event){
    event.preventDefault();
    
    this.setState({ isLoading: true });
    this.props.getBooks()
      .then((data)=>{
      if(data.response && data.response.status >= 400){
        this.setState({
          isLoading:false
        });
      }else{
        this.props.showPage(BOOKS_FETCHED_PAGE)
      }
    })
  }

  viewAuthors(event){
    event.preventDefault();
    
    this.setState({ isLoading: true });
    this.props.getAuthors()
      .then((data)=>{
      if(data.response && data.response.status >= 400){
        this.setState({
          isLoading:false
        });
      }else{
        this.props.showPage(AUTHORS_FETCHED_PAGE)
      }
    })
  }

  render(){
    const View = ({icon, name, onClick, disabled}) => (
      <span 
        className={classnames(`glyphicon glyphicon-${ icon }`)}
        onClick={ onClick }
        disabled ={ disabled }>
        <p>{ name }</p>
      </span>
    )
    return(
      <div id="sidebar-views">
        <View
          icon={'th-list'}
          name={'Book categories'}
          onClick={this.viewCategories}
          disabled={this.state.isLoading}/>
        <View
          icon={'book'}
          name={'Books'}
          onClick={this.viewBooks}
          disabled={this.state.isLoading}/>
        <View
          icon={'user'}
          name={'Authors'}
          onClick={this.viewAuthors}
          disabled={this.state.isLoading}/>
      </div>
    )
  }
}

const actionCreators = {
  getBooks,
  getAuthors,
  fetchGenres,
  showPage,
  loadPage,
  hidePage
}
export { SidebarViews }

export default connect(null, actionCreators)(SidebarViews);