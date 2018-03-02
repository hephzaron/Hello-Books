import React from 'react';
import PropTypes from 'prop-types';

/**
 * File upload presentational component
 * @function FileUpload
 * @description Renders the file upload component
 * @param { object } props
 * @return { JSX } -JSX element
 */

const FileUpload = (props) => (
  <span className = "inputfile-box" >
  <div className="preview">
  <label htmlFor="file" className = "btn btn-default" >{props.fileExtensionMessage}</label>
    <input 
      type="file" 
      id="file"
      name="file" 
      className="inputfile"
      name = "inputfile" 
      accept= {`.jpg, .jpeg, .png, ${props.fileExtension ? props.fileExtension:''}` }
      onchange={props.onChange}/>
        <p>{props.uploadMessage}</p>
    </div>
    {
      props.validationError.name && 
      <p className = "form-text text-danger">
        {props.validationError.name}
      </p>
    }
    {
      props.validationError.size && 
      <p className = "form-text text-danger">
        {props.validationError.size}
      </p>
    }
      <span 
        className = "btn btn-group btn-default"   
        style={{width:'100%'}}
        onClick = {props.uploadFile}>
        Click to upload
      </span>
  </span>
)

FileUpload.propTypes = {
  onChange: PropTypes.func,
  fileExtension: PropTypes.string,
  fileExtensionMessage: PropTypes.string,
  validationError: PropTypes.object.isRequired,
  uploadMessage: PropTypes.string.isRequired,
  uploadFile: PropTypes.func.isRequired
}
FileUpload.defaultProps = {
  uploadMessage: 'No files currently selected for upload'
}

export default FileUpload;