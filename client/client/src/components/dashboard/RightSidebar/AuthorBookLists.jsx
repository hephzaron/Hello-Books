import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomList from 'General/CustomList';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { getAuthors } from 'Actions/authorActions';
import BookListItems from './BookListItems';
import $ from 'jquery';

const propTypes = {
  authors: PropTypes.array
}

class AuthorBookLists extends Component {
  constructor(props){
    super(props);
    this.state= {
      isLoading: false,
      authors: [{
            "fullName": "Nelkon Parker",
            "id": 1,
            "Books": [{
                "id": 1,
                "title": "Java programming for beginners"
            }, {
                "id": 2,
                "title": "R-studio programming"
            }, {
                "id": 3,
                "title": "Video editing"
            }]
        },
        {
            "fullName": "Charles Philip",
            "id": 2,
            "Books": [{
                "id": 1,
                "title": "ES6 for experts"
            }, {
                "id": 2,
                "title": "Building micro services"
            }, {
                "id": 3,
                "title": "Hone your skills"
            }]
          }
        ]
      };
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