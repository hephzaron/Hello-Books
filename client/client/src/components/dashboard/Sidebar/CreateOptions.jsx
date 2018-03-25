import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import CustomList from 'General/CustomList';


/**
 * @function CreateOptions
 * @description Renders a custom dropdown component
 * @param {void}
 * @return {JSX}
 */

const CreateOptions = (props) => 
{
  const listContent = [
    { 
      name:'Book Genre',
      onClick: props.clickGenre,
      href:''
    },{
      role:'seperator'
    },{
      name: 'Author',
      onClick: props.clickAuthor,
      href: ''
    },{
      role:'seperator'
    },{
      name: 'Book',
      onClick: props.clickBook,
      href:''
    },{
      role:'seperator'
    },{
      name: 'Assign book to author(s)',
      onClick: props.clickAssign,
      href:''
    }
  ]

  return(
    <div className = "btn-group dropdown">
    <CustomList
      identifier={'create-options'}
      listDirection={'right'}
      listContent={listContent}
      dropdownInitiator={'dropdown-create-options'}/>
  </div>
  )
}

CreateOptions.propTypes = {
  clickAuthor: PropTypes.func.isRequired,
  clickGenre: PropTypes.func.isRequired,
  clickBook: PropTypes.func.isRequired,
  clickAssign: PropTypes.func.isRequired
}

export default CreateOptions;