import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  items: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
}

/**
 * @function CenterPageList
 * @description This renders a custom list component for center page display
 * @param { object } props
 * @returns { JSX }
 */

const CenterPageList = (props) => {
  const { items, isLoading } = props;
  return(
    <ul className='list-group'>
    {
      items && items.map(item=>{
        const {
          id,
          title,
          description,
          createdAt,
          updatedAt,
          Authors,
          fullName,
          Books,
          name,
          books
        } = item;
        return (
          <li key={id} className="list-group-item">
            <h5 className='list-group-item-heading'>
              {title && title}
              {name&& name}
              {fullName && fullName}
              {fullName &&<span className='badge'>
                {
                  Array.isArray(Books)&& Books.length!==0 ?
                  Books.length: null
                }
                {
                  Array.isArray(books)&& books.length!==0 ?
                  books.length: null
                }
              </span>}
            </h5>
            { Array.isArray(Authors)&& Authors.length>=1 ?
              <p className='list-group-item-text'>
              {
                Authors.reduce((previous,next)=> (
                  `${previous.fullName}, ${next.fullName}`
                ))
              }           
              </p> : null             
            }
            <p className='list-group-item-text'>
            {
              createdAt&&<span>{`Created on ${moment(createdAt).format('ll')}`}</span>}
            <br/>
            {
              updatedAt&&<span>{`Last updated at ${moment(updatedAt).format('ll')}`}</span>}
            </p>
            <span 
              className={classnames(`${isLoading?'disbale':''} btn btn-default edit`)} 
              onClick={() =>props.onEditClick(item)}>Edit</span>
          
            <span 
              className={classnames(`${isLoading?'disbale':''} btn btn-default edit`)} 
              onClick={() =>props.onDeleteClick(item)}>Delete</span>
          </li>)
        }
      )
    }
    </ul>
  )
}

CenterPageList.propTypes = propTypes;
export default CenterPageList;