import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import pageTypes from './pageTypes';
import FlashMessageList from 'Components/FlashMessageList';
import { loadPage, showPage, hidePage } from 'Actions/centerPage';
import { getBooks } from 'Actions/bookActions';

{/* import page custom components*/}

import SearchPage from '../pages/SearchPage';
import BooksFetchedPage from '../pages/BooksFetchedPage';
import AuthorsFetchedPage from '../pages/AuthorsFetchedPage';
import GenresFetchedPage from '../pages/GenresFetchedPage';

const CENTER_PAGE_COMPONENTS = {
  SEARCH_PAGE: SearchPage,
  BOOKS_FETCHED_PAGE: BooksFetchedPage,
  AUTHORS_FETCHED_PAGE: AuthorsFetchedPage,
  GENRES_FETCHED_PAGE: GenresFetchedPage
}

const { BOOKS_FETCHED_PAGE } = pageTypes;

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
  componentDidMount(){
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
  render(){
      if(!this.props.pageType){
        return null
      }
      const SpecificPage = CENTER_PAGE_COMPONENTS[this.props.pageType]; 
        return(
          <div className="col-md-6">
            <FlashMessageList />
            <SpecificPage/>
          </div>
      );
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
