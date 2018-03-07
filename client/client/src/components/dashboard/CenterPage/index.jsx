import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import pageTypes from './pageTypes';
import FlashMessageList from 'Components/FlashMessageList';

{/* import page custom components*/}

import SearchPage from 'Dashboard/pages/SearchPage'

const CENTER_PAGE_COMPONENTS = {
  SEARCH_PAGE: SearchPage
}

const contextTypes = {
  router: PropTypes.object.isRequired
};

const propTypes = {
  pageType: PropTypes.string.isRequired
}

class CenterPageContainer extends Component {
  render(){
      if(!this.props.pageType){
        return null
      }
      const SpecificPage = CENTER_PAGE_COMPONENTS[this.props.pageType]; 
        return(
          <div className="col-md-4">
            <FlashMessageList />
            <SpecificPage/>
          </div>
      );
    }
};


CenterPageContainer.contextTypes = contextTypes;

CenterPageContainer.propTypes = propTypes;

const mapStateToProps = state => ({
  pageType: state.centerPage.pageType
});

export default connect(mapStateToProps)(CenterPageContainer);
