import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomList from 'General/CustomList';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { fetchGenres } from 'Actions/genreActions';
import BookListItems from './BookListItems';

const propTypes = {
  genres: PropTypes.array
}

/**
 * @class GenreBookLists
 * @extends { React.Component }
 * @description renders a list of book category and assigned books
 * @param { object } props
 * @returns { JSX }
 */

class GenreBookLists extends Component {
  constructor(props){
    super(props);
    this.state= {
      isLoading: false,
      genres: [{
            "name": "Maths and statistics",
            "id": 1,
            "Books": [{
                "id": 1,
                "title": "Java programming for beginners"
            }, {
                "id": 2,
                "title": "R-studio programming"
            }]
        },
        {
            "name": "Sciences",
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
            }, {
                "id": 4,
                "title": "Video editing"
            }]
          }
        ]
      };
  }

  /**
   * @method componentWillMount 
   * @memberof GenreBookLists
   * @description lifecycle method just before components mount to fetch genres
   * @param { null }
   * @returns { null }
   */
  componentWillMount(){
    this.setState({
      isLoading:true
    });
    this.props.fetchGenres()
  }

  render(){

    return(
      <ul id='booklist-dropdown' >
        { this.state.genres.map((genre)=>(
          <BookListItems
            items={genre}/>
        ))}
      </ul>
    )
  }
}
const mapStateToProps = (state)=> ({
  genres: state.genres['genres']
});

const actionCreators = {
  fetchGenres
}

export { GenreBookLists }
export default connect(mapStateToProps, actionCreators)(GenreBookLists)