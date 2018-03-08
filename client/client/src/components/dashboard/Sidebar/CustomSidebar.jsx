import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import CreateOptions from './CreateOptions';

const CustomSidebar = (props) => (
  <div className={classnames(`${props.sidebarClass} col-md-3`)}>
    <div className="btn btn-default dropdown-toggle" onClick={props.onClickCreate}>Create</div>
    <CreateOptions/>
    <hr/>
    <div id="wrapper">
      <div className="scrollbar" id="style-default">
        <div className="sidebar-toggle-button">
          <span className="btn btn-default btn-l active">Books</span>
          <span className="btn btn-default btn-r">Borrowed Books</span>
        </div>
        <div className="force-overflow"></div>
      </div>
    </div>
  </div>
)

CustomSidebar.propTypes = {
  sidebarClass: PropTypes.string,
  onClickCreate: PropTypes.func
}

export default CustomSidebar;