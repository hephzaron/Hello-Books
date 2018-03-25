import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FlashMessageList from 'Components/FlashMessageList';
import { loadPage, showPage, hidePage } from 'Actions/centerPage';
import Spinner from '../Spinner';
import ErrorBoundary from '../../ErrorBoundary';
import pageTypes from './pageTypes';

{/* import page custom components*/}

import SearchPage from '../pages/Search';
import AuthorPage from '../pages/Author';
import GenrePage from '../pages/Genre';
import BookPage from '../pages/Book';
import AssignBookPage from '../pages/AssignBook';
import BooksFetchedPage from '../pages/Book/BooksFetchedPage';
import AuthorsFetchedPage from '../pages/Author/AuthorsFetchedPage';
import GenresFetchedPage from '../pages/Genre/GenresFetchedPage';

const { BOOKS_FETCHED_PAGE } = pageTypes;

const CENTER_PAGE_COMPONENTS = {
  SEARCH_PAGE: SearchPage,
  AUTHOR_PAGE: AuthorPage,
  GENRE_PAGE: GenrePage,
  BOOK_PAGE: BookPage,
  ASSIGN_BOOK_PAGE: AssignBookPage,
  BOOKS_FETCHED_PAGE: BooksFetchedPage,
  AUTHORS_FETCHED_PAGE: AuthorsFetchedPage,
  GENRES_FETCHED_PAGE: GenresFetchedPage
}

const contextTypes = {
  router: PropTypes.object.isRequired
};

const propTypes = {
  pageType: PropTypes.string.isRequired
}
/**
 * @class CenterPageContainer
 * @extends { React.Component }
 * @description Center page to render different pages
 * @param { object } props
 * @returns { JSX }
 */
class CenterPageContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true
    }
  }
  componentWillReceiveProps(nextProps){
    if(this.props.pageType !== nextProps.pageType){
      this.setState({
        isLoading:false
      })
    }
  }

  componentDidMount(){
    this.setState({
      isLoading:false
    });
    this.props.showPage(BOOKS_FETCHED_PAGE)
  }
  render(){
      if(this.state.isLoading){
        return (
          <Spinner/>
        )
      }else{
      const SpecificPage = CENTER_PAGE_COMPONENTS[this.props.pageType]; 
        return(
          <Fragment>
            <FlashMessageList />
            <ErrorBoundary>
              {this.props.pageType && <SpecificPage/>}
            </ErrorBoundary>
          </Fragment>)
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
  hidePage
}

export default connect(mapStateToProps, actionCreators)(CenterPageContainer);
