import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from 'Forms/Button';
import SingleInput from 'Forms/SingleInput';
import FileUpload from 'Forms/UploadFile/FileUpload';
import TextArea from 'Forms/TextArea';
import SelectionList from 'General/SelectionList';
import FlashMessageList from 'Components/FlashMessageList';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  validationError: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  book: PropTypes.object.isRequired,
  imageFile: PropTypes.object.isRequired,
  docFile: PropTypes.object.isRequired,
  buttonRole: PropTypes.string.isRequired,
  uploadFile: PropTypes.func.isRequired,
  genres: PropTypes.array.isRequired,
  onItemClick: PropTypes.func.isRequired
}

const BookForm = (props) => (
  <form className="form-user" id="book-form" onSubmit = {props.onSubmit}>
    <h2>
      {props.buttonRole === 'create'? 'Create New Book':
        (props.buttonRole==='edit'?'Update Book': 
        null)}
    </h2>
    <SelectionList
      inputName = "Categories"
      placeholder="book categories"
      showItems = {props.showItems}
      onChange = {props.onChange}
      value={props.genreName}
      listName="genreName">
      {props.genres && 
        props.genres.map(genre=>
        <li 
          key={genre.id} 
          onClick={() => props.onItemClick(genre)}>
            {genre.name}
        </li>
      )}
    </SelectionList>
    {
      props.validationError.genreName && 
      <p className = "form-text text-danger">
        {props.validationError.genreName}
      </p>
    }
    <SingleInput
      identifier = "inputTitle"
      placeholder = "Title"
      name = "title"
      label = "Book title:"
      onChange = {props.onChange}
      value = {props.book.title}/>
      {
        props.validationError.title && 
        <p className = "form-text text-danger">
          {props.validationError.title}
        </p>
      }
    <SingleInput
      identifier = "inputISBN"
      placeholder = "ISBN"
      name = "ISBN"
      label = "ISBN:"
      onChange = {props.onChange}
      value = {props.book.ISBN}/>
      {
        props.validationError.ISBN && 
        <p className = "form-text text-danger">
          {props.validationError.ISBN}
        </p>
      }
    <SingleInput
      identifier = "inputQuantity"
      placeholder = "Quantity"
      name = "quantity"
      label = "Book quantity:"
      onChange = {props.onChange}
      value = {props.book.quantity}/>
      {
        props.validationError.quantity&& 
        <p className = "form-text text-danger">
          {props.validationError.quantity}
        </p>
      }
    <TextArea
      label= "Book description"/>
    <FileUpload
      fileExtensionMessage = "Upload pics"
      fileExtension = ".jpg, .jpeg, .png"
      uploadMessage = {props.imageFile['name']}
      name = "image"/>
    
      {
        props.validationError.image && 
        <p className = "form-text text-danger">
          {props.validationError.image}
        </p>
      }
    <FileUpload
      fileExtensionMessage = "Upload docs"
      fileExtension = ".pdf"
      uploadMessage = {props.docFile['name']}
      name = "doc"/>
      {
        props.validationError.doc && 
        <p className = "form-text text-danger">
          {props.validationError.doc}
        </p>
      }
    <Button
      name = {props.buttonRole}
      icon = {false}
      disabled = {props.isLoading}
      className = "btn-success"/>
  </form>
)

BookForm.propTypes = propTypes;

export default BookForm;



