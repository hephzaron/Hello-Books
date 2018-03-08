import React from 'react';
import PropTypes from 'prop-types';
import SingleInput from 'Forms/SingleInput';

const Search = (props) => (
  <SingleInput 
    identifier = "search"
    placeholder = "Find authors and books"
    name = "search"
    onChange = {props.onChange}
    value = {props.items.search}
    iconClass = "glyphicon-search"
    onIconClick = {props.onIconClick}
  />
)

Search.propTypes = {
  onChange: PropTypes.func,
  search: PropTypes.object,
  onIconClick: PropTypes.func
}

export default Search