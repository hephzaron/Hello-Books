import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import pageTypes from './pageTypes';
import FlashMessageList from 'Components/FlashMessageList';
import { loadPage, showPage, hidePage } from 'Actions/centerPage';
import { getBooks } from 'Actions/bookActions';
import Spinner from '../Spinner';
import ErrorBoundary from '../../ErrorBoundary';

{/* import page custom components*/}

import SearchPage from '../pages/Search';
import AuthorPage from '../pages/Author';
import BooksFetchedPage from '../pages/Book/BooksFetchedPage';
/**import AuthorsFetchedPage from '../pages/Author/AuthorsFetchedPage';
import GenresFetchedPage from '../pages/Genre/GenresFetchedPage';**/

const CENTER_PAGE_COMPONENTS = {
  SEARCH_PAGE: SearchPage,
  AUTHOR_PAGE: AuthorPage,
  BOOKS_FETCHED_PAGE: BooksFetchedPage,
  /**AUTHORS_FETCHED_PAGE: AuthorsFetchedPage,
  GENRES_FETCHED_PAGE: GenresFetchedPage**/
}

const { BOOKS_FETCHED_PAGE, AUTHOR_PAGE } = pageTypes;

const contextTypes = {
  router: PropTypes.object.isRequired
};

const propTypes = {
  pageType: PropTypes.string.isRequired
}

class CenterPageContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false
    }
  }

  render(){
      if(this.state.isLoading){
        return (
          <Spinner/>
        )
      }else{
      const SpecificPage = CENTER_PAGE_COMPONENTS[this.props.pageType]; 
        return(
          <div className="col-md-6">
            <FlashMessageList />
            <ErrorBoundary>
              {this.props.pageType && <SpecificPage/>}
            </ErrorBoundary>
          </div>)
      }
    }
};


CenterPageContainer.contextTypes = contextTypes;

CenterPageContainer.propTypes = propTypes;

const mapStateToProps = state => ({
  pageType: state.centerPage.pageType
});

const actionCreators = {
  loadPage,
  showPage,
  hidePage,
  getBooks
}

export default connect(mapStateToProps, actionCreators)(CenterPageContainer);
