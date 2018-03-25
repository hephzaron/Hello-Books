import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import CustomList from 'General/CustomList';

/**
 * @function UserOptions
 * @description Presentational component to render user options dropdown
 * @param { object } props 
 * @returns { JSX }
 */
const UserOptions = (props)=> {
  const { 
    user: 
    { 
      email, 
      username 
    }, 
    viewProfile, 
    signOut, 
    changePassword 
  } = props

  const listContent = [
    {
      role:'seperator'
    },{ 
      name:'View profile',
      href:'',
      onClick: viewProfile
    },{
      role:'seperator'
    },{
      name: 'Change password',
      href:'',
      onClick: changePassword
    },{
      role:'seperator'
    },{
      name: 'Sign out',
      href:'',
      onClick: signOut
    }
  ]

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
  user: PropTypes.object.isRequired,
  viewProfile: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired
}

export default UserOptions;