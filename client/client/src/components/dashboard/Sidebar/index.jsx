import React , { Component } from 'react';
import CustomSidebar from './CustomSidebar';
import { toggleElementClass } from 'Utils/toggle';
import LinkedBookList from './LinkedBookList';
import { getBooks } from 'Actions/bookActions';
import  { fetchBorrowedBook, returnBook } from 'Actions/borrowActions';
import { connect } from 'react-redux';
import ErrorBoundary from 'Components/ErrorBoundary';

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
      books:[{
        id: 1,
        title: 'Java programming for beginners',
        available: 7,
        createdAt: '2018-03-04T15:36:19.802Z',
        Authors:[
          {fullName: 'J.P Clarke'}
        ]},{
        id: 2,
        title: 'Avalanche of historical facts',
        available: 3,
        createdAt: '2018-03-04T15:36:19.802Z',
        Authors:[
          {fullName: 'J.P Clarke-1'}
        ]},{
        id: 3,
        title: 'The lover and his dog',
        available: 9,
        createdAt: '2018-03-04T15:36:19.802Z',
        Authors:[
          {fullName: 'J.P Clarke-2'}
        ]}
      ],
      borrowedBooks:[{
        id: 1,
        title: 'R - the tool for data science',
        Borrowed: {
          returned: false,
          createdAt: '2018-03-04T15:36:19.802Z'
        }
      },{
        id:2,
        title: 'The loner and his castle',
        Borrowed: {
          returned: false,
          createdAt: '2017-03-04T15:36:19.802Z'
        }
      },{
        id:3,
        title: 'A tale of the mountain man',
        Borrowed: {
          returned: false,
          createdAt: '2017-02-04T15:36:19.802Z'
        }
      }]
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
        isLoading: false
      });
    });
    
    this.props.fetchBorrowedBook(this.props.user)
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
        listBorrowedBook = {this.listBorrowedBook}>
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