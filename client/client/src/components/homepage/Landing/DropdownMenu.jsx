import React, { Component } from 'react';
import classnames from 'classnames';
import CustomList from '../../general/CustomList';

const onSelectAlert =  (eventKey) => {
  alert(`Alert from menu item .\neventKey: ${eventKey}`);
}

/**
 * @description Renders a custom dropdown component
 * @param {void}
 * @return {JSX}
 */
const listContent = [
  { 
    name:'Read a book',
    href:'/signin'
  },{
    name: 'Get a book',
    href:'/signin'
  },{
    role:'seperator'
  },{
    name: 'Visit a bookshop',
    role:'header',
    href:'#'
  },{
    role:'seperator'
  },{
    name: 'Contact Us',
    href: '#'
  }
]
const ServiceDropdown = () => (
  <div className = "btn-group dropdown">
    <h5 className="dropdown-toggle"
        aria-haspopup="true"
        aria-expanded="false"
        style ={{fontWeight:'bold', fontSize:'18px', color:'rgb(100, 78, 200)',}}>
        {`Our services`}<span className="caret"></span>
    </h5>
    <CustomList
      identifier={'#services'}
      listDirection={'down'}
      listContent={listContent}
    />

  </div>
)

export default ServiceDropdown;