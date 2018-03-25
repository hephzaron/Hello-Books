import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BookForm from './BookForm';
import validateBook from 'Utils/validators/book';
import validateGenre from 'Utils/validators/genre';
import validFileType from 'Utils/validators/upload';
import { createBook, editBook } from 'Actions/bookActions';
import { fetchGenres } from 'Actions/genreActions';
import { genres } from '../client-data';

/**
 * @class BookPage
 * @description Renders Book page component
 * @param {object}-props
 * @returns {JSX} - React element * 
 */

class BookPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      book:{
        genre_id:0,
        title:'',
        quantity:0,
        description:'',
        ISBN:'',
        fileDir:'',
        imageDir:''
      },
      editedBook:{
        id: 0
      },
      genreName:'',
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
      genres: [
        ...genres
      ],
      showItems:false,
      isLoading: false,
      errors:{}
    }    
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleImageSelect = this.handleImageSelect.bind(this);
    this.handleDocSelect = this.handleDocSelect.bind(this);
    this.onGenreClick = this.onGenreClick.bind(this);
  }

/**
 * @method componentWillRecieveProps
 * @memberof BookPage
 * @description Lifecycle method before component recieves next props
 * @param {null}
 * @returns {void}
 */

  componentWillReceiveProps(nextProps){
    if(this.props.editedBook && 
      (this.state.editedBook['id'] !== nextProps.editedBook['id'])){
        const { editedBook :{ id, genre_id }} = nextProps;
      this.setState({
        editedBook:Object.assign({},this.state.book,{ id }),
        book: Object.assign({}, this.state.book, nextProps.editedBook),
        genreName: this.state.genres.filter((genre)=>
          genre.id === genre_id 
        )[0].name
      });
    }
  }

/**
 * @method componentWillMount
 * @memberof BookPage
 * @description Lifecycle method before component mount
 * @param {null}
 * @returns {void}
 */

  componentWillMount(){
    if(this.props.editedBook){
    const { editedBook :{ id, genre_id }} = this.props
    this.setState({
      editedBook:Object.assign({},this.state.book,this.props.editedBook),
      book: Object.assign({}, this.state.book, this.props.editedBook),
      genreName: this.state.genres.filter((genre)=>
        genre.id === genre_id )[0].name
      });
    }
  }

/**
 * @method componentDidMount
 * @memberof BookPage
 * @description Lifecycle method to handle click and 
 * change events for files and book categories
 * @param {null}
 * @returns {void}
 */
componentDidMount(){
  
  this.props.fetchGenres();

  let imageFile = document.getElementById('image-file');
  let docFile = document.getElementById('doc-file');
  imageFile.addEventListener('change', this.handleImageSelect,false);
  docFile.addEventListener('change',this.handleDocSelect,false);

  
  let dropdownSelect = document.getElementById('dropdown-select-genreName');
  dropdownSelect.addEventListener('click',()=>{
    this.setState({
      showItems:!this.state.showItems
    })
  })

}

/**
 * @method onChange
 * @memberof BookPage
 * @description Handles on change event for form fields
 * @param {object}  event - event handler
 * @returns {void}
 */

  onChange(event){
    if(event.target.name==='genreName'){
      this.setState({
        genreName: event.target.value,
        showItems: true
      })
    }
    
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
   * @memberof BookPage
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
      book:{
        ...this.state.book,
        ['imageDir']:window.URL.createObjectURL(files[0])
      },
      errors:{
        ...errors,
        image : null
      }
    });

  }

   /**
   * @method handleDocSelect
   * @description This handles form input onChnage event
   * @param {object} event-event handler
   * @returns {undefined}
   * @memberof BookPage
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
      book:{
        ...this.state.book,
        fileDir: window.URL.createObjectURL(files[0])
      },
      errors:{
        ...errors,
        doc:null
      }
    });

  }

 /**
 * @method onSubmit
 * @memberof BookPage
 * @description Handles form submission
 * @param { object } event - event handler
 * @returns {void}
 */
  onSubmit(event){
    event.preventDefault();

    if(!this.isGenreValid()||!this.isFormValid()){ 
      return;
    }   
    if(this.props.editedBook){
      const { editedBook : { id }} = this.state;
      this.props.editBook(Object.assign({}, this.state.book,{ id }));
    }
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

/**
 * @method isGenreValid
 * @memberof BookPage
 * @description Validates user selection from a list of book genres
 * @param {null}
 * @returns { boolean } isValid
 */

  isGenreValid(){
    const { genres, genreName } = this.state;
    let { errors, isValid } = validateGenre({genres, genreName},'select');
    if(!isValid){
      this.setState({
        errors, 
        showItems:false
      });
    }
    this.setState({
      showItems:false
    });
    return isValid;
  }

/**
 * @method isFormValid
 * @memberof BookPage
 * @description Validates user entries on form
 * @param {null}
 * @returns { boolean } isValid
 */

  isFormValid(){
    let { errors, isValid } = validateBook(this.state.book);
    if(!isValid){
      this.setState({errors});
    }
    return isValid;
  };


/**
 * @method onGenreClick
 * @memberof BookPage
 * @description handles click event on genre selection list
 * @param { object } item - list item
 * @returns { void } 
 */
  onGenreClick(item){
    this.setState({
      book:{
        ...this.state.book,
        ['genre_id']:item.id
      },
      showItems: false,
      genreName: item.name
    });
  }

  render(){
    
    return(
      <BookForm
        validationError = {this.state.errors}
        book = {this.state.book}
        isLoading = {this.state.isLoading}
        onChange = {this.onChange}
        onSubmit = {this.onSubmit}
        buttonRole = {`${this.props.editedBook ? 'update':'create'}`}
        imageFile = {this.state.image}
        docFile = {this.state.document}
        genres={this.state.genres}
        genreName={this.state.genreName}
        showItems={this.state.showItems}
        onItemClick={(item)=>this.onGenreClick(item)}
        editBookModal = {this.props.editedBook}/>
    )
  }
}

BookPage.propType = {
  editedBook: PropTypes.object
}

const mapStateToProps = (state) => ({
  genres: state.genres['genres']
})

const actionCreators = {
  createBook,
  editBook,
  fetchGenres
}
export { BookPage }
export default connect(mapStateToProps, actionCreators)(BookPage)