import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import CreateOptions from './CreateOptions';
import SidebarViews from './SidebarViews';
import pageTypes from '../CenterPage/pageTypes';
import { loadPage } from 'Actions/centerPage';
import { connect } from 'react-redux';

const { 
  AUTHOR_PAGE, 
  GENRE_PAGE,
  BOOK_PAGE
} = pageTypes;

class CustomSidebar extends Component {
  constructor(props){
    super(props);
    this.clickAuthor = this.clickAuthor.bind(this);
    this.clickGenre = this.clickGenre.bind(this);
    this.clickBook = this.clickBook.bind(this);
  }

  clickAuthor(event){
    event.preventDefault();
    this.props.loadPage(AUTHOR_PAGE)
  }

  clickGenre(event){
    event.preventDefault();
    this.props.loadPage(GENRE_PAGE)
  }

  clickBook(event){
    event.preventDefault();
    this.props.loadPage(BOOK_PAGE)
  }

  render(){
    return(
      <div className={classnames(`${this.props.sidebarClass} col-md-3`)}>
        <div className="btn btn-default dropdown-create-options" >Create</div>
        <CreateOptions
          clickAuthor = {this.clickAuthor}
          clickGenre = {this.clickGenre}
          clickBook = {this.clickBook}/>
        <hr/>
        <div id="wrapper">
          <div className="scrollbar" id="style-default">
            <div className="sidebar-toggle-button">
              <span className="btn btn-default btn-l active" onClick = {this.props.listBook}>Books</span>
              <span className="btn btn-default btn-r" onClick = {this.props.listBorrowedBook}>Borrowed Books</span>
            </div>
            <div className="force-overflow">{this.props.children}</div>
          </div>
        </div>
        <hr/>
        <span style={{textAlign:'center', fontWeight:'bold'}}>View</span>
        <SidebarViews/>
      </div>   
    )
  }

}

CustomSidebar.propTypes = {
  sidebarClass: PropTypes.string,
  listBook: PropTypes.func.isRequired,
  listBorrowedBook: PropTypes.func.isRequired,
  children: PropTypes.node
}

const actionCreators = {
  loadPage
}
export { CustomSidebar }

export default connect(null, actionCreators)(CustomSidebar);