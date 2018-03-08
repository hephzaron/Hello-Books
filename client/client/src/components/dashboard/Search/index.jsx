import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CustomSearch from './CustomSearch';
import { searchBooks } from 'Actions/bookActions';
import { loadPage, showPage, hidePage } from 'Actions/centerPage';
import pageTypes from '../CenterPage/pageTypes';
import { addFlashMessage } from 'Actions/flashMessage';

const { SEARCH_PAGE } = pageTypes;

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      items:{
        search:''
      },
      isLoading: false
    }

    this.onChange = this.onChange.bind(this);
    this.onIconClick = this.onIconClick.bind(this);
  }
  onChange(event){
    this.setState({
      items: {
        ...this.state.items,
        [event.target.name]: event.target.value
      }
    })
  }
  onIconClick(event){
    event.preventDefault();
    this.props.searchBooks(this.state.items['search'])
    .then((data)=>{
      if(data.response && data.response.status >= 400){
        this.setState({
          isLoading:false
        });
      }else{
        this.props.showPage(SEARCH_PAGE)
      }
    })
  }
  render(){
    return(
      <CustomSearch
        onChange = { this.onChange }
        search = { this.state.search }
        onIconClick = { this.onIconClick }/>
    )
  }
}

/**
 * @description Maps dispatch to props
 * @param {object} dispatch
 * @returns {object} map dispatch to props 
 */

const actionCreators = {
  loadPage, 
  showPage, 
  hidePage
}


export { Search }
export default connect(null, actionCreators)(Search);
