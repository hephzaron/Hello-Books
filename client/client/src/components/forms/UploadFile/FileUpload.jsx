import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * File upload presentational component
 * @function FileUpload
 * @description Renders the file upload component
 * @param { object } props
 * @return { JSX } -JSX element
 */

const FileUpload = (props) => (
  <div className = "upload-file">
  <span className = "inputfile-box" >
  <div className="preview">
  <label 
    htmlFor={`${props.name}-file`}
    className = {"btn btn-default glyphicon glyphicon-folder-open"} >
      <p>{` ${props.fileExtensionMessage}`}</p>
  </label>
    <input 
      type="file" 
      id={`${props.name}-file`}
      name={props.name}
      className={classnames(`inputfile`)}
      accept= {props.fileExtension ? props.fileExtension:''}/>
        <p>{props.uploadMessage}</p>
    </div>
  </span>
  </div>
)

FileUpload.propTypes = {
  fileExtension: PropTypes.string.isRequired,
  fileExtensionMessage: PropTypes.string.isRequired,
  uploadMessage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}
FileUpload.defaultProps = {
  uploadMessage: 'No files currently selected for upload'
}

export default FileUpload;