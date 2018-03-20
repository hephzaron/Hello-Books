import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchGenres } from 'Actions/genreActions';
import CenterPageList from '../CenterPageList';
import {genres} from '../client-data';

class GenresFetchedPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      genres: [...genres]
    }
  }

  componentDidMount(){
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
      <CenterPageList
        listPageClass = "genre-list"
        items={this.state.genres}
        pageOffset = { 10 }
        isLoading={this.state.isLoading}/>
    )
  }
}

GenresFetchedPage.propTypes = {
  genres: PropTypes.array.isRequired
}

const mapStateToProps = (state) =>({
  genres: state.genres['genres']
})

const actionCreators = {
  fetchGenres
}
export { GenresFetchedPage }
export default connect (mapStateToProps, actionCreators)(GenresFetchedPage)
