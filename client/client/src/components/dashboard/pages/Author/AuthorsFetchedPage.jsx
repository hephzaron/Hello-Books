import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class AuthorsFetchedPage extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
    return(
      <ul className="list-group">
        {
          this.props.authors &&
        }
      </ul>
    )
  }
}