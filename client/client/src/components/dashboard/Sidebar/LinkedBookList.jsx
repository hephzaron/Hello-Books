import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { borrowBook, returnBook } from 'Actions/borrowActions';

/**
 * @class LinkedBookList
 * @extends { React.Component }
 * @description Renders list items and handles individual item eventd
 * @param { object } props
 * @returns { JSX }
 */

class LinkedBookList extends Component {

  constructor(props){

    super(props);
    this.borrowBook = this.borrowBook.bind(this);
    this.returnBook = this.returnBook.bind(this);
  }
  
  /**
   * @method borrowBook
   * @memberof LinkedBookList
   * @description Borrows book
   * @param {number} id 
   * @returns { void }
   */
  borrowBook(id){
    this.props.borrowBook({
      userId:this.props.user['userId'],
      bookId: id
    })
  }

   /**
   * @method returnBook
   * @memberof LinkedBookList
   * @description Returns book
   * @param {number} id 
   * @returns { void }
   */
  returnBook(id){
    this.props.returnBook({
      userId:this.props.user['userId'],
      bookId: id
    })
  }
  render(){
    const { isLoading } = this.props
    return(
      <ul className='list-group'>
        {
          this.props.items.map((item)=>{
            const {
              id,
              title,
              available,
              Authors,
              createdAt,
              Borrowed
            } = item;

            return(
              <li key={id} className='list-group-item'>
                <h5 className='list-group-item-heading'>
                  {title}
                  {available&&<span className='badge'>{available}</span>}
                </h5>
                <p className='list-group-item-text'>
                {
                  createdAt&&<span>{`Added on ${moment(createdAt).format('ll')}`}</span>}
                 { Borrowed&&<span>{`Borrowed ${moment(Borrowed.createdAt).fromNow()}`}</span>
                }
                  {
                    Borrowed? <span 
                      className={classnames(`${isLoading?'disable':''} badge return`)} 
                      onClick={() => this.returnBook(id)}>Return</span> :
                      ((available && Authors) ? 
                      <span 
                        className={classnames(`${isLoading?'disbale':''} badge borrow`)} 
                        onClick={() =>this.borrowBook(id)}>Borrow</span> :null )
                  }
                </p>
              </li>)
          })
        }
      </ul>
    )
  }
}

LinkedBookList.propTypes = {
  items: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
}

const actionCreators = {
  borrowBook,
  returnBook
}

export { LinkedBookList }
export default connect(null,actionCreators)(LinkedBookList)