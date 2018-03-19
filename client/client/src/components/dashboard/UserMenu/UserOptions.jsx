import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import CustomList from 'General/CustomList';

const listContent = [
  {
    role:'seperator'
  },{ 
    name:'View profile',
    href:''
  },{
    role:'seperator'
  },{
    name: 'Change password',
    href:''
  },{
    role:'seperator'
  },{
    name: 'Sign out',
    href:''
  }
]

/**
 * @function UserOptions
 * @description Presentational component to render user options dropdown
 * @param { object } props 
 * @returns { JSX }
 */
const UserOptions = (props)=> {
  const { email, username } = props.user;

  return(
    <div className = "btn-group dropdown">
      <CustomList
        identifier={'user-options'}
        listDirection={'down'}
        listContent={listContent}
        dropdownInitiator={'dropdown-user-options'}>
        <img
          src={require('Public/images/user-profile.png')}
          width={45} 
          height={45}
          mode='fit'/>
        <span>
          <p>{email}</p>
          <p>{username}</p>
        </span>
      </CustomList>
    </div>
  )
}

UserOptions.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserOptions;