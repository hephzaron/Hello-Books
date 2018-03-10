import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import $ from 'jquery';

/**
 * @description Returns a Custom list
 * @class {CustomList}
 * @param {Object} props- component props
 * @param {string} props.identifier - id for the <ul> tag
 * @param {string} props.listContent - Items to appear on list
 * @param {string} props.listDirection - Direction of list to be display , with triangle inclusive
 * @param {Object} [...rest] - Any class props to be added to <ul>
 * @returns {JSX} - JSX Component
 */

 
const propTypes = {
  identifier: PropTypes.string.isRequired,
  listDirection: PropTypes.string.isRequired,
  listContent:PropTypes.array.isRequired,
  rest: PropTypes.obejct,
  children: PropTypes.node,
  dropdownInitiator: PropTypes.string.isRequired
}

class CustomList extends Component{
  componentDidMount(){
    
    $(`.${this.props.dropdownInitiator}`).click(()=>{
      $(`#${this.props.identifier}`).toggle()
    });
    $(".navbar-toggle").click(()=>{
      $("#bs-example-navbar-collapse-l").toggle()
    });
    $(document).click((event)=>{
      let target = $(event.target);
      if(!target.is(`.${this.props.dropdownInitiator}`)&&!target.is(`#${this.props.identifier}`)){
        $(`#${this.props.identifier}`).hide()
      }
    });
  }

  
  render(){

    const {
      listContent,
      listDirection, 
      identifier, 
      ...rest
     } = this.props;

    {/**Switch Lists attached arrow position based on usual choice*/}    
    let pos 
    switch (listDirection){
      case 'up':
        pos='u';
      break;
      case 'right':
        pos='r';
      break;
      case 'left':
        pos='l';
      break;
      default:
      pos='d'
    }
  
  
    const listItems = listContent.map((item, index)=>
    <li key={index}
      role={item.role?item.role:''}
      className = {classnames(item.role=='seperator'?'divider':'list-item',
          item.role=='header'?'dropdown-header':'')}
      style = {{...item['role'] === 'header' ? {fontSize:'17px'}:{fontSize:'16px'}}}>
      {(!item.role || item['role']!=='seperator') &&
        <a href={item.href}>{item.name}</a>
      }
    </li>
  );
  return(
      <ul id = {identifier} 
          className={classnames(
          `dropdown-menu dropdown-menu-triangle-b-${pos}`
        )}
        {...rest}>
        {this.props.children && 
          <li>{this.props.children}</li>
        }
        {listItems}
      </ul>
    );
  }
}
CustomList.propTypes = propTypes;


export default CustomList