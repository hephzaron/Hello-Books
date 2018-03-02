import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const BookList = (props) => (

  const {
    books,
    listClass,
    listGroupClass,
    bookRequest,
    identifier,
    children
  } = props
    const bookList = books.map((book) => 
      <li
        key = {book.id}
        className={classnames(`list-group-item ${listClass}`)}>
        {book.title}
        <span className= "badge">{bookRequest}</span>
        { const { Authors } = book;
          Array.isArray(Authors)&& Authors.length>=1 ?
          <br/>
          <p>
            { Authors.reduce((previous, next) =>
              `${previous.fullName}, ${next.fullName}`)}
          </p>: null }
      </li>
    );
    return(
      <ul 
        id={identifier}
        className = {classnames(`list-group ${listGroupClass}`)}>
        {bookList}
        <li className = "list-group-item">{children && children}</li>
      </ul>
    )
}

const propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.object.isRequired
  ).isRequired,
  listClass: PropTypes.string,
  listGroupClass: PropTypes.string,
  bookRequest: PropTypes.string.isRequired,
  identifier: PropTypes.string.isRequired,
  children: PropTypes.node
}
BookList.propTypes = propTypes;

export default BookList;