import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

/**
 * @function RightSidebar
 * @param { object } props
 * @description Presentational component for right sidebar components
 * @returns { JSX }
 */

const RightSidebar = (props) => (
  <div className={classnames(`${props.rightSidebarClass}`)}>
    <span className="glyphicon glyphicon-list-alt"> Sort books by</span>
    <hr/>
      <div className="nested-list" id="style-default">
        <div className="sidebar-toggle-button">
          <span 
            className={classnames('get-authors glyphicon glyphicon-user btn active-r')}
            onClick={props.sortByAuthors}>{` Authors`}</span>
          <span 
            className={classnames('glyphicon glyphicon-tasks btn')}
            onClick={props.sortByCategories}>{` Genres`}</span>
        </div>
        <div className="sorted-list">{props.children}</div>
      </div>
    </div>
)

RightSidebar.propTypes = {
  rightSidebarClass: PropTypes.string,
  sortByAuthors: PropTypes.func,
  sortByCategories: PropTypes.func
}

export default RightSidebar;