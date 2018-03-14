import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import CreateOptions from './CreateOptions';
import SidebarViews from './SidebarViews';

class CustomSidebar extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <div className={classnames(`${this.props.sidebarClass} col-md-3`)}>
        <div className="btn btn-default dropdown-create-options" onClick={this.props.onClickCreate}>Create</div>
        <CreateOptions/>
        <hr/>
        <div id="wrapper">
          <div className="scrollbar" id="style-default">
            <div className="sidebar-toggle-button">
              <span className="btn btn-default btn-l active" onClick = {this.props.listBook}>Books</span>
              <span className="btn btn-default btn-r" onClick = {this.props.listBorrowedBook}>Borrowed Books</span>
            </div>
            <div className="force-overflow">{this.props.children}</div>
          </div>
        </div>
        <hr/>
        <span style={{textAlign:'center', fontWeight:'bold'}}>View</span>
        <SidebarViews/>
      </div>   
    )
  }

}

CustomSidebar.propTypes = {
  sidebarClass: PropTypes.string,
  onClickCreate: PropTypes.func.isRequired,
  listBook: PropTypes.func.isRequired,
  listBorrowedBook: PropTypes.func.isRequired,
  children: PropTypes.node
}

export default CustomSidebar;