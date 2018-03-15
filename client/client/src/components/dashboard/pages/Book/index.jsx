import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BookForm from './BookForm';
import validateBook from 'Utils/validators/book';
import validFileType from 'Utils/validators/upload';
import { createBook } from 'Actions/bookActions';

class BookPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      book:{
        title:'',
        quantity:0,
        description:'',
        fileDir:'',
        imageDir:''
      },
      image : {
        name: 'No image currently selected',
        size: 0,
        imgDir: ''
      },
      document : {
        name: 'No doc currently selected',
        size: 0,
        fileDir: ''        
      },
      isLoading: false,
      errors:{}
    }    
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleImageSelect = this.handleImageSelect.bind(this);
    this.handleDocSelect = this.handleDocSelect.bind(this);
  }

  
componentDidMount(){
  let imageFile = document.getElementById('image-file');
  let docFile = document.getElementById('doc-file');
  imageFile.addEventListener('change', this.handleImageSelect,false);
  docFile.addEventListener('change',this.handleDocSelect,false);
}

  onChange(event){
    
    this.setState({
      book:{
        ...this.state.book,
        [event.target.name] : event.target.value
      }
    });
  }

   /**
   * @method handleImageSelect
   * @description This handles form input onChnage event
   * @param {object} event-event handdler
   * @returns {undefined}
   * @memberof UploadFile
   */

  handleImageSelect(event){

    let files = event.target.files

    const { errors, isValid } = validFileType({image:files[0]},'image');

    if(!isValid){
      this.setState({errors});
      return;
    }
    
    this.setState({
      image:{
      ...this.state.image,
      name: files[0].name,
      size: files[0].size,
      imgDir: window.URL.createObjectURL(files[0])
      },
      errors: {}
    });

  }

   /**
   * @method handleDocSelect
   * @description This handles form input onChnage event
   * @param {object} event-event handdler
   * @returns {undefined}
   * @memberof UploadFile
   */

  handleDocSelect(event){

    let files = event.target.files;

    const { errors, isValid } = validFileType({doc:files[0]},'document');

    if(!isValid){
      this.setState({errors});
      return;
    }
    
    this.setState({
      document:{
        ...this.state.document,
        name: files[0].name,
        size: files[0].size,
        fileDir: window.URL.createObjectURL(files[0])
      },
      errors: {}
    });

  }

  onSubmit(event){
    event.preventDefault();

    if(!this.isFormValid()){ 
      return;
    }
    this.setState({errors:{}})    
    this.setState({isLoading:true});
    this.props.createBook(this.state.book)
     .then(data=>{
       if(data.response && data.response.status>=400){
         this.setState({isLoading:false})
       }else{
         document.getElementById('book-form').reset();
       }
     })

  }

  isFormValid(){
    const { errors, isValid } = validateBook(this.state.book);
    if(!isValid){
      this.setState({errors});
    }
    return isValid;
  };

  render(){
    return(
      <BookForm
        validationError = {this.state.errors}
        book = {this.state.book}
        isLoading = {this.state.isLoading}
        onChange = {this.onChange}
        onSubmit = {this.onSubmit}
        buttonRole = {'create'}
        imageFile = {this.state.image}
        docFile = {this.state.document}/>
    )
  }
}

const actionCreators = {
  createBook
}
export { BookPage }
export default connect(null, actionCreators)(BookPage)