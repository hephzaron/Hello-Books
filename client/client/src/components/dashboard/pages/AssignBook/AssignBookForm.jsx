import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectionList from 'General/SelectionList';
import Button from 'Forms/Button';

const AssignBookForm = ( props ) => (
  <form className="form-user" id="assign-book-form" onSubmit = {props.onSubmit}>
    <SelectionList
      inputName = "Books"
      placeholder="books"
      showItems = {props.showBooks}
      onChange = {props.onChange}
      value={props.book.title}
      listName="bookTitle">
      {props.books && 
        props.books.map(book=>
        <li 
          key={book.id} 
          onClick={() => props.onBookClick(book)}>
            {book.title}
        </li>
      )}
    </SelectionList>
    {
      props.validationError.bookTitle && 
      <p className = "form-text text-danger">
        {props.validationError.bookTitle}
      </p>
    }
    <SelectionList
      inputName = "Authors"
      placeholder="authors"
      showItems = {props.showAuthors}
      onChange = {props.onChange}
      value={props.author.fullName}
      listName="authorName">
      {props.authors && 
        props.authors.map(author=>
        <li 
          key={author.id} 
          onClick={() => props.onAuthorClick(author)}>
            {author.fullName}
        </li>
      )}
    </SelectionList>
    {
      props.validationError.authorName && 
      <p className = "form-text text-danger">
        {props.validationError.authorName}
      </p>
    }
    <Button
      name = {props.buttonRole}
      icon = {false}
      disabled = {props.isLoading}
      className = "btn-success"/>
  </form>
)

AssignBookForm.propTypes = {
  book: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  onBookClick: PropTypes.func.isRequired,
  onAuthorClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  showAuthors: PropTypes.bool.isRequired,
  showBooks: PropTypes.bool.isRequired
}

export default AssignBookForm;