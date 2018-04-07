import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomList from 'General/CustomList';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { getAuthors } from 'Actions/authorActions';
import BookListItems from './BookListItems';

const propTypes = {
  authors: PropTypes.array
}

/**
 * @class AuthorBookLists
 * @extends { React.Component }
 * @description Renders a list of authors and written books
 * @param { object } props
 * @returns { JSX }
 */
class AuthorBookLists extends Component {
  constructor(props){
    super(props);
    this.state= {
      authors: []
      };
  }

  /**
   * @method componentWillMount
   * @memberof AuthorBookLists
   * @description Lifecycle event just before component mounts
   * @param { null }
   * @returns { void }
   */
  componentWillMount(){
    this.props.getAuthors()
    .then(()=>{
      this.setState({
        authors:[
          ...this.props.authors
        ]
      });
    })
    .catch(()=>{
      this.setState({
        authors:[]
      });
    })
  }
  render(){

    return(
      <ul id='booklist-dropdown' >
        { this.state.authors.map((author)=>(
          <BookListItems
            items={author}/>
        ))}
      </ul>
    )
  }
}
const mapStateToProps = (state)=> ({
  authors: state.authors['authors']
});

const actionCreators = {
  getAuthors
}

export { AuthorBookLists }
export default connect(mapStateToProps, actionCreators)(AuthorBookLists)