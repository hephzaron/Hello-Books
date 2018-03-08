import React from 'react';
import PropTypes from 'prop-types';
import SingleInput from 'Forms/SingleInput';

const Search = (props) => (
  <SingleInput 
    identifier = "search"
    placeholder = "Find authors and books"
    name = "search"
    onChange = {props.onChange}
    value = {props.searchItem}
    iconClass = "glyphicon-search"
    inputClass = "search-input"
    containerClass = "search-container"
    onIconClick = {props.onIconClick}
  />
)

Search.propTypes = {
  onChange: PropTypes.func,
  searchItem: PropTypes.object,
  onIconClick: PropTypes.func
}

export default Search