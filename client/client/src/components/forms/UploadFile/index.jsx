import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FileUpload from './FileUpload';
import validFileType from 'Utils/validators/upload';


/**
   * @description Defines class proptypes
   * @param { void }
   * @memberof UploadFile
   * @returns {undefined}
   */

const propTypes = {
    uploadFile: PropTypes.func.isRequired
  }
/**
 * @class UploadFile
 * @description Manages state for rendered FileUpload Component
 * @extends React.Componenet
 */

class UploadFile extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      file : {
        name: 'No files currently selected for upload',
        size: 0,
        imgDir: ''
      },
      errors:{}
    };
    
    this.handleFileSelect = this.handleFileSelect.bind(this);
  }
componentDidMount(){
  let file = document.getElementById('file');
  file.addEventListener('change', this.handleFileSelect,false)
}

  /**
   * @method onChange
   * @description This handles form input onChnage event
   * @param {object} event-event handdler
   * @returns {undefined}
   * @memberof UploadFile
   */

  handleFileSelect(event){

    let files = event.target.files;

    const { errors, isValid } = validFileType(files[0],'image');

    if(!isValid){
      this.setState({errors});
      return;
    }
    
    this.setState({
      file:{
      ...this.state.file,
      name: files[0].name,
      size: files[0].size,
      imgDir: window.URL.createObjectURL(files[0])
      },
      errors: {}
    });

  }
  render(){
    return (
        <FileUpload
          fileExtensionMessage = {'Choose file...'}
          validationError = {this.state.errors}
          uploadMessage = {this.state.file['name']}
          uploadFile = {this.props.uploadFile}/>   
    )
  }
}
UploadFile.propTypes = propTypes;

export default UploadFile;