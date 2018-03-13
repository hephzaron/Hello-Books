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

  componentWillMount(){
    this.setState({
      isLoading:true
    });
    this.props.fetchGenres()
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