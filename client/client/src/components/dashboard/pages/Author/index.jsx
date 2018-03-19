import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AuthorForm from './AuthorForm';
import validateAuthor from 'Utils/validators/author';
import { createAuthor } from 'Actions/authorActions';

/**
 * @class AuthorPage
 * @description Renders the author page component
 * @param { object } props;
 * @return { JSX }
 */

class AuthorPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      author:{
        firstName:'',
        lastName:'',
        dateOfBirth:'',
        dateOfDeath:''
      },
      isLoading: false,
      errors:{}
    }    
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @method onChange
   * @memberof AuthorPage
   * @description Handles on Change event
   * @param { event }  event handler
   * @returns { void }
   */

  onChange(event){
    this.setState({
      author:{
        ...this.state.author,
        [event.target.name] : event.target.value
      }
    });
  }

   /**
   * @method onSubmit
   * @memberof AuthorPage
   * @description Handles on Submit event
   * @param { event }  event handler
   * @returns { void }
   */
  onSubmit(event){
    event.preventDefault();

    if(!this.isFormValid()){ 
      alert(this.state.author.dateOfDeath)
      return;
    }
    this.setState({errors:{}})    
    this.setState({isLoading:true});
    this.props.createAuthor(this.state.author)
     .then(data=>{
       if(data.response && data.response.status>=400){
         this.setState({isLoading:false})
       }else{
         document.getElementById('author-form').reset();
       }
     })

  }
  /**
   * @method isFormValid
   * @memberof AuthorPage
   * @description Validates user entries into author form
   * @param { null } void
   * @returns { boolean } isValid
   */

  isFormValid(){
    const { errors, isValid } = validateAuthor(this.state.author);
    if(!isValid){
      this.setState({errors});
    }
    return isValid;
  };

  render(){
    return(
      <AuthorForm
        validationError = {this.state.errors}
        author = {this.state.author}
        isLoading = {this.state.isLoading}
        onChange = {this.onChange}
        onSubmit = {this.onSubmit}
        buttonRole = {'create'}/>
    )
  }
}

const actionCreators = {
  createAuthor
}
export { AuthorPage }
export default connect(null, actionCreators)(AuthorPage)