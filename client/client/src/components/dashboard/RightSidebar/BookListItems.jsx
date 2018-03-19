import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import $ from 'jquery';
import PropTypes from 'prop-types';
import { toggleElementClass } from 'Utils/toggle';

/**
 * @class BookListItems
 * @extends { React.Component }
 * @description Renders and handle dropdown of book lists 
 * @param { object } - props
 * @return { JSX } elements
 */

class BookListItems extends Component{
  constructor(props){
    super(props);

    this.state ={
      itemId: this.props.items.id
    }
  }


  /**
   * @memberof BookListItems
   * @method componentDidMount
   * @description Lifecycle method to handle component's toggle
   * @return { null } -void
   */
  componentDidMount(){
    $(`.dropdown-menu-${this.state.itemId}`).hide()
    $(`.span-${this.state.itemId}`).click(()=>{
      if($(`.span-${this.state.itemId}`).hasClass('glyphicon-menu-right')){
        $(`.span-${this.state.itemId}`).removeClass('glyphicon-menu-right')
          .addClass('glyphicon-menu-down')
      }else {
        $(`.span-${this.state.itemId}`).removeClass('glyphicon-menu-down')
          .addClass('glyphicon-menu-right')        
      }
      $(`.dropdown-menu-${this.state.itemId}`).toggle()
    })
  }

  render(){
    const { 
      items: 
      {
        id, 
        fullName, 
        name, 
        Books 
      }} = this.props;
    
    return(
      
      <li key={id} className='dropdown-toggle'>
        <span 
          key={`span-${id}`} 
          className={classnames(`glyphicon glyphicon-menu-right span-${id}`)}></span>
        {
          (fullName?fullName:(name?name:null))
        }
        <ul 
          className={`dropdown-menu-${id}`}>
          {
            Books.length !== 0 &&
            Books.map(book =>
              <li key={book.id} className='dropdown-item'>{book.title}</li>
            )
          }
        </ul>
      </li>
    )
  }
}

BookListItems.propTypes = {
  items: PropTypes.object.isRequired
}

export default BookListItems;