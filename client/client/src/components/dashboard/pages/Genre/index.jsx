import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GenreForm from './GenreForm';
import validateGenre from 'Utils/validators/genre';
import { createGenre } from 'Actions/genreActions';

class GenrePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      genre:{
        name:''
      },
      isLoading: false,
      errors:{}
    }    
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event){
    this.setState({
      genre:{
        ...this.state.genre,
        [event.target.name] : event.target.value
      }
    });
  }

  onSubmit(event){
    event.preventDefault();

    if(!this.isFormValid()){ 
      return;
    }
    this.setState({errors:{}})    
    this.setState({isLoading:true});
    this.props.createGenre(this.state.genre)
     .then(data=>{
       if(data.response && data.response.status>=400){
         this.setState({isLoading:false})
       }else{
         document.getElementById('genre-form').reset();
       }
     })

  }

  isFormValid(){
    const { errors, isValid } = validateGenre(this.state.genre,'create');
    if(!isValid){
      this.setState({errors});
    }
    return isValid;
  };

  render(){
    return(
      <GenreForm
        validationError = {this.state.errors}
        genre = {this.state.genre}
        isLoading = {this.state.isLoading}
        onChange = {this.onChange}
        onSubmit = {this.onSubmit}/>
    )
  }
}

const actionCreators = {
  createGenre
}
export { GenrePage }
export default connect(null, actionCreators)(GenrePage)