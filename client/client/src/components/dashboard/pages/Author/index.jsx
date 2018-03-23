import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AuthorForm from './AuthorForm';
import validateAuthor from 'Utils/validators/author';
import { createAuthor, editAuthor } from 'Actions/authorActions';
import moment from 'moment';

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
      editedAuthor:{
        id: 0
      },
      isLoading: false,
      errors:{}
    }    
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }

  /**
 * @method componentWillRecieveProps
 * @memberof AuthorPage
 * @description Lifecycle method before component recieves next props
 * @param {null}
 * @returns {void}
 */

componentWillReceiveProps(nextProps){
  if(this.props.editedAuthor && 
    (this.state.editedAuthor['id'] !== nextProps.editedAuthor['id'])){
      const { editedAuthor :{ id}} = nextProps;
    this.setState({
      editedAuthor:Object.assign({},this.state.author,{ id }),
      author: Object.assign({}, this.state.author,this.formatDate(nextProps.editedAuthor))
    });
  }
}

/**
 * @method componentWillMount
 * @memberof AuthorPage
 * @description Lifecycle method before component mount
 * @param {null}
 * @returns {void}
 */
  componentWillMount(){
    if(this.props.editedAuthor){
    this.setState({
      editedAuthor:Object.assign({},this.state.author,this.formatDate(this.props.editedAuthor)),
      author: Object.assign({}, this.state.author, this.formatDate(this.props.editedAuthor))
      });
    }
  }

  /**
   * formatDate
   * @memberof AuthorPage
   * @description format date before been displayed in form filed
   * @param { object } object 
   * @returns { object } 
   */
  formatDate(object){
    const { dateOfBirth, dateOfDeath } = object
   let dOB = dateOfBirth ? dateOfBirth.split('T')[0] : '' ;
   let dOD = dateOfDeath ? dateOfDeath.split('T')[0] : '' ;
   return Object.assign({}, object,{
     dateOfBirth: dOB,
     dateOfDeath: dOD
   });
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
        buttonRole = {`${this.props.editedAuthor ? 'update':'create'}`}
        editAuthorModal = {this.props.editedAuthor}/>
    )
  }
}

const actionCreators = {
  createAuthor,
  editAuthor
}
export { AuthorPage }
export default connect(null, actionCreators)(AuthorPage)