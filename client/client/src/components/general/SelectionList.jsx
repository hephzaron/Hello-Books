import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { toggleDropdown, toggleElementClass } from 'Utils/toggle';


const propTypes = {
  children: PropTypes.node.isRequired,
  inputName: PropTypes.string,
  showItems: PropTypes.bool.isRequired,
  listName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

/**
 * @description Renders a custom dropdown component
 * @param {object} - props
 * @return {JSX}
 */


class SelectionList extends Component {
  
  render() {
    const { 
      children, 
      value, 
      listName, 
      placeholder,
      inputName,
      showItems,
      onChange 
    } = this.props;

    return (
      <div className="input-group dropdown">
        <input
          id = "input-filter"
          type="text"
          name= {listName}
          className="form-control"
          placeholder={`Type to filter ${placeholder}...`}
          onChange={onChange}
          value={value}
        />
        <span 
          className="input-group-btn dropdown">
          <button
            id={`dropdown-select-${listName}`}
            type="button" 
            className="btn btn-default">
            {`${inputName} `}<span className="caret"></span>
          </button>
        </span>
        {
          showItems && 
          <ul className="select-items" id= "select-items">
            {Children.toArray(children).filter(
              child => !value.trim() || 
              child.props.children.toLowerCase().indexOf(value.toLowerCase()) !== -1
            )}
          </ul>
        }
      </div>
    );
  }
}

SelectionList.propTypes = propTypes;

export default SelectionList;


