import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AssignBookForm from './AssignBookForm';
import { getBooks } from 'Actions/bookActions';
import { getAuthors, assignAuthor } from 'Actions/authorActions';
import { books } from '../client-data';
import { authors } from '../client-data';

/**
 * @class AssignBookPage
 * @extends { React.Component }
 * @description This page handles assigning book to authors
 * @param { object } props
 * @returns { JSX }
 */

class AssignBookPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      books: [...books],
      authors: [...authors],
      book: {
        id:0,
        title:''
      },
      author:{
        id:0,
        fullName:''
      },
      errors:{
        bookTitle:'',
        authorName:''
      },
      isLoading: false,
      showAuthors: false,
      showBooks: false
    }
    this.onAuthorClick = this.onAuthorClick.bind(this);
    this.onBookClick = this.onBookClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.validateSelection = this.validateSelection.bind(this);
  }

  /**
   * @method componentDidMount
   * @memberof AssignBookPage
   * @description Lifecycle method to initiate on Click listeners after component mounts
   * @param { void }
   * @returns { null }
   */

  componentDidMount(){ 
    let dropdownAuthors= document.getElementById('dropdown-select-authorName');
    dropdownAuthors.addEventListener('click',()=>{
      this.setState({
        showAuthors:!this.state.showAuthors
      })
    }); 
    
    let dropdownBooks= document.getElementById('dropdown-select-bookTitle');
    dropdownBooks.addEventListener('click',()=>{
      this.setState({
        showBooks:!this.state.showBooks
      })
    });
  }
  
  /**
   * @method onChange
   * @memberof AssignBookPage
   * @description Handles onChange event
   * @param { event } event 
   * @return { void }
   */

  onChange(event){
    if(event.target.name === 'authorName'){
      this.setState({
        author:{
          ...this.state.author,
          fullName: event.target.value
        },
        showAuthors: true        
      });
    }
    if(event.target.name === 'bookTitle'){
      this.setState({
        book:{
          ...this.state.book,
          title: event.target.value
        },
        showBooks: true
      });
    }
  }

  /**
   * @method onBookClick
   * @memberof AssignBookPage
   * @description handles click on selected book
   * @param {object} book 
   * @returns { void }
   */
  onBookClick(book){
    this.setState({
      book:{
        ...this.state.book,
        id: book.id,
        title: book.title
      },
      showBooks: false
    })
  }

  /**
   * @method onAuthorClick
   * @memberof AsignBookPage
   * @description Listens to click on selected author from list
   * @param { object } author 
   * @returns { void }
   */
  onAuthorClick(author){
    this.setState({
      author:{
        ...this.state.author,
        id: author.id,
        fullName: author.fullName
      },
      showAuthors: false
    })
  }

  /**
   * @method validateSelection
   * @memberof AssignBookPage
   * @description validates user entry from list of items provided
   * @param { array } listOfItems - an array of items
   * @param { string } item - selected item
   * @returns { boolean }
   */

  validateSelection(listOfItems, item){
    const isValid = listOfItems.filter((object)=>
    object.title===item || object.fullName===item )
    return isValid.length >= 1
  }

  /**
   * @method onSubmit
   * @memberof AssignBookPage
   * @description Handles form submission
   * @param { event } -event listener
   * @returns { void }
   */

  onSubmit( event ){
    const { books, authors, book, author } = this.state;
    const authorId = author.id;
    const bookId = book.id;
    event.preventDefault();
    if(!this.validateSelection(books, book.title)){
      this.setState({
        errors:{
          ...this.state.errors,
          bookTitle : 'Oops! book title not available, select from available items'
        }
      })
      return
    }
    
    if(!this.validateSelection(authors, author.fullName)){
      this.setState({
        errors:{
          ...this.state.errors,
          authorName : 'Oops! author not available, select from available items'
        }
      })
      return
    }
    this.setState({
      errors:{}
    });

    this.setState({
      isLoading: true
    });
    this.props.assignAuthor({authorId, bookId})
      .then((data)=>{
        if(data.response && data.response.status>=400){
          this.setState({
            isLoading: false
          });
        }else{
         document.getElementById('assign-book-form').reset();
        }
      })

  }

  render(){
    return(
      <AssignBookForm
        book = {this.state.book}
        books = {this.state.books}
        onBookClick = {(book) => this.onBookClick(book) }
        author = { this.state.author }
        authors = { this.state.authors }
        onAuthorClick = {(author)  => this.onAuthorClick(author)}
        onChange = {this.onChange}
        onSubmit = { this.onSubmit }
        showBooks = { this.state.showBooks }
        showAuthors = { this.state.showAuthors}
        validationError = {this.state.errors}
        buttonRole = "Assign"
        validationError = {this.state.errors}
        isLoading = {this.state.isLoading}/>
    )
  }
}
const mapStateToProps = (state) =>({
  books: state.books['books'],
  authors: state.authors['authors']
});

const actionCreators = {
  getAuthors,
  getBooks,
  assignAuthor
}

export { AssignBookPage }
export default connect (mapStateToProps, actionCreators)(AssignBookPage);