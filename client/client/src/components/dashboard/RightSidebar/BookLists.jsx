import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomList from 'General/CustomList';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { getAuthors } from 'Actions/authorActions';
import { toggleDropdown } from 'Utils/toggle';

const propTypes = {
  authors: PropTypes.array
}

class BookLists extends Component {
  constructor(props){
    super(props);
    this.state= {
      isLoading: false
    };
    this.toggleAuthorBooks = this.toggleAuthorBooks.bind(this);
  }

  componentWillMount(){
    this.setState({
      isLoading:true
    });
    this.props.getAuthors()
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


  toggleAuthorBooks(authorClass, bookClass){
    toggleDropdown(authorClass,bookClass)
  }

  render(){
    const { authors } = this.props;

    const BookListByAuthor = ({author})=>(
      <div className = {classnames(`author-${author.id}`)}>
        <span 
          className={
            classnames(`author-toggle-${author.id} glyphicon glyphicon-menu-right`)
          }
          onClick = {
            this.toggleAuthorBooks(`author-toggle-${author.id}`,`dropdown-author-books-${author.id}`)
          }> 
          {author['fullName']}
        </span>
        <div className={classnames(`dropdown-author-books-${author.id}`)}>
          {
            author['Books'].map((book)=>{
              return(
                <p className={classnames(`book-${book.id}`)}>{book.title}</p>
              )
            })
          }
        </div>
      </div>
    )
    return(
      <div>
        {authors.map((author)=>(
          <BookListByAuthor
            author={author}/>
        ))}
      </div>
    )
  }
}
const mapStateToProps = (state)=> ({
  authors: state.authors['authors']
});

const actionCreators = {
  getAuthors
}

export { BookLists }
export default connect(mapStateToProps, actionCreators)(BookLists)