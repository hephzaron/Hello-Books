import React, { Component } from 'react';
import classnames from 'classnames';
import CustomList from 'General/CustomList';


/**
 * @description Renders a custom dropdown component
 * @param {void}
 * @return {JSX}
 */
const listContent = [
  { 
    name:'Book Genre',
    href:''
  },{
    role:'seperator'
  },{
    name: 'Author',
    href:''
  },{
    role:'seperator'
  },{
    name: 'Book',
    href:''
  }
]
const CreateOptions = () => (
  <div className = "btn-group dropdown">
    <CustomList
      identifier={'create-options'}
      listDirection={'right'}
      listContent={listContent}
      dropdownInitiator={'dropdown-create-options'}/>
  </div>
)

export default CreateOptions;