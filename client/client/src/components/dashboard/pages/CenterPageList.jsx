import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';

const propTypes = {
  items: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  listPageClass: PropTypes.string.isRequired
}

/**
 * @class CenterPageList
 * @extends { React.Component }
 * @description This renders a custom list component for center page display
 * @param { object } props
 * @returns { JSX }
 */

class CenterPageList extends Component {

  constructor(props){
    super(props);
    this.state = {
      items:[],
      pager: {
        page: 1,
        startIndex: 0,
        endIndex:5,
        lastPage: false,
        lastPageNum: 0
      }
    }
    this.goToPreviousPage = this.goToPreviousPage.bind(this);
    this.goToNextPage = this.goToNextPage.bind(this);
  }

  componentDidMount(){
   const { startIndex, endIndex } = this.state.pager;
    this.setState({
      items:[
        ...this.props.items.slice(startIndex, endIndex)
      ],
      pager:{
        ...this.state.pager,
        lastPageNum: this.props.items.length
      }
    })
  }

  goToPreviousPage(){
    const { startIndex, page } = this.state.pager
    if(page>1){
      this.setState({
        items: [
          ...this.props.items.slice(startIndex - 5, startIndex)
        ],
        pager: {
          ...this.state.pager,
          page: page - 1,
          startIndex: startIndex - 5,
          endIndex: startIndex 
        }
      })
    }
  }

  goToNextPage(){
    const { startIndex, page, lastPageNum } = this.state.pager;
    if(page >= (lastPageNum/5)){
      this.setState({
        pager:{
          ...this.state.pager,
          lastPage:true
        }
      });
      return;
    }
      this.setState({
        items: [
          ...this.props.items.slice(startIndex + 5, startIndex + 10)
        ],
        pager: {
          ...this.state.pager,
          page: page + 1,
          startIndex: startIndex + 5,
          endIndex: startIndex + 10,
        }
      })
  }

  render(){
    const { isLoading, listPageClass } = this.props;
    const { items } = this.state;
    return(
      <Fragment>
      <ul className="pager">
       <li onClick={this.goToPreviousPage}><a>Previous</a></li>
       <li onClick = {this.goToNextPage}><a>Next</a></li>
      </ul>
      <ul className={classnames(`list-group ${listPageClass}`)}>
      {
        items && items.map(item=>{
          const {
            id,
            title,
            description,
            createdAt,
            updatedAt,
            dateOfBirth,
            dateOfDeath,
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
                {fullName &&<span className='badge'>{
                    Array.isArray(Books)&& Books.length!==0 ?
                    `${Books.length} books written`: null
                  }
                  {
                    Array.isArray(books)&& books.length!==0 ?
                    `${books.length} books`: null
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
                { (dateOfBirth && dateOfDeath) ?
                  `Lived from ${moment(dateOfBirth).format('ll')} to ${moment(dateOfDeath).format('ll')}`:
                  ((dateOfBirth && !dateOfDeath) ? `Born on ${moment(dateOfBirth).format('ll')}, (still alive)`: null )
                }
                <br/>
              {
                (createdAt && updatedAt)&&
                <span>
                {`Created on ${moment(createdAt).format('ll')}, `}
                {`Last updated on ${moment(updatedAt).format('ll')}`}
                </span>
              }
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
      </Fragment>
    )
  }
}

CenterPageList.propTypes = propTypes;
export default CenterPageList;