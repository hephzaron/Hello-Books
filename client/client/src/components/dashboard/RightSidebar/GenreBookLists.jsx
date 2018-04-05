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
      genres: []
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
    this.props.fetchGenres();
    this.setState({
      genres:[
        ...this.props.genres
      ]
    });
  }

  componentWillReceiveProps(nextProps){
    if(this.state.genres !== nextProps.genres){
      this.setState({
        genres:[
          ...nextProps.genres
        ]
      })
    }
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