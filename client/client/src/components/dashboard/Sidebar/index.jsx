import React , { Component } from 'react';
import CustomSidebar from './CustomSidebar';
import { toggleElementClass } from 'Utils/toggle';
import LinkedBookList from './LinkedBookList';
import { getBooks } from 'Actions/bookActions';
import  { fetchBorrowedBook, returnBook } from 'Actions/borrowActions';
import { connect } from 'react-redux';
import ErrorBoundary from 'Components/ErrorBoundary';
import { books } from '../pages/client-data';

/**
 * @class Sidebar
 * @extends { React.Component }
 * @description renders the left sidebar components
 * @param { object } props
 * @returns { JSX }
 */
class Sidebar extends Component {
  constructor(props){
    super(props);

    this.state = {
      list: 'book',
      isLoading: false,
      books:[],
      borrowedBooks:[]
    }
    this.listBook = this.listBook.bind(this);
    this.listBorrowedBook = this.listBorrowedBook.bind(this)
  }

  /**
   * @method componentWillMount
   * @memberof SIdebar
   * @description Lifecycle component just before component mounts
   * @param { null } 
   * @returns { void }
   */

  componentWillMount(){
    
    this.setState({
      isLoading:true
    });
    this.props.getBooks()
      .then((data)=>{
      if(data.response && data.response.status >= 400){
        this.setState({
          isLoading:false
        });
      }
      this.setState({
        isLoading: false,
        books:[
          ...this.props.books
        ]
      });
    })
    .catch(()=>{
      this.setState({
        isLoading:false,
        books:[]
      })
    })
    
    this.props.fetchBorrowedBook(this.props.user)
      .then((data)=>{
      if(data.response && data.response.status >= 400){
        this.setState({
          isLoading:false
        });
      this.setState({
        isLoading: false,
        borrowedBooks:[
          ...this.props.borrowedBooks
        ]
      });
      }
      this.setState({
        isLoading: false
      });
    })
    .catch(()=>{
      this.setState({
        isLoading:false,
       borrowedBooks:[]
      })
    })     
  }

  /**
   * @method componentDidMount
   * @memberof Sidebar
   * @description Lifecycle component after component mounts
   * @param { null } 
   * @returns { void }
   */
  componentDidMount(){
    toggleElementClass({
        toggleType: 'double',
        previous:'.btn-l',
        next:'.btn-r',
        toggledClass: 'active'
    });
  }
  
  /**
   * @method listBook
   * @memberof Sidebar
   * @description Handles click event to show books list
   * @param { event }  event handler
   * @returns { void }
   */
  listBook(event){
    event.preventDefault();
    this.setState({
      list:'book'
    });
  }

  /**
   * @method listBorrowedBook
   * @memberof Sidebar
   * @description Handles click event to show borrowed books list
   * @param { event }  event handler
   * @returns { void }
   */
  listBorrowedBook(event){
    event.preventDefault();
    this.setState({
      list:'borrowed'
    })
  }

  render(){
    return(
      <ErrorBoundary>
      <CustomSidebar
        sidebarClass = "admin-sidebar"
        listBook = {this.listBook}
        listBorrowedBook = {this.listBorrowedBook}
        user={this.props.user}>
        {this.state.list==='book' && 
          <LinkedBookList
            items={this.state.books}
            isLoading={this.state.isLoading}
            user={this.props.user}/>}
        {this.state.list==='borrowed' &&
          <LinkedBookList
            items={this.state.borrowedBooks}
            isLoading={this.state.isLoading}
            user={this.props.user}/>}
      </CustomSidebar>
      </ErrorBoundary>
    )
  }
}

const mapStateToProps = (state)=> ({
  books: state.books['books'],
  borrowedBooks: state.borrowedReturn['borrowedBooks'],
  userBooks: state.borrowedReturn['userBooks'],
  returnedBooks: state.borrowedReturn['returnedBooks'],
  user: state.auth['user']
});

const actionCreators = {
  getBooks,
  fetchBorrowedBook,
  returnBook
}

export {Sidebar}

export default connect(mapStateToProps, actionCreators)(Sidebar)
