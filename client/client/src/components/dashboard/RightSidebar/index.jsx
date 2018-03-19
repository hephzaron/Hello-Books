import React , { Component } from 'react';
import RightSidebar from './RightSidebar';
import AuthorBookLists from './AuthorBookLists';
import GenreBookLists from './GenreBookLists';
import { toggleElementClass } from 'Utils/toggle';

/**
 * @class SortSidebar
 * @extends { React.Component }
 * @description renders the right sider bar components 
 * @param { object } props
 * @returns { JSX } 
 */

class SortSidebar extends Component {
  constructor(props){
    super(props);

    this.state = {
      sortOptions: 'authors'
    }
    this.sortByAuthors = this.sortByAuthors.bind(this);
    this.sortByCategories = this.sortByCategories.bind(this);
  }

  /**
   * @method componentDidMount
   * @memberof  SortSidebar
   * @description Lifecycle method after component mounts
   * @param { null } 
   * @returns { void }
   */

  componentDidMount(){
    toggleElementClass({
        toggleType: 'double',
        previous:'.nested-list .glyphicon-user',
        next:'.glyphicon-tasks',
        toggledClass: 'active-r'
    });
  }

  /**
   * @method sortByAuthors
   * @memberof SortSidebar
   * @description Display list of sorted book by author
   * @param {event} event handler 
   */
sortByAuthors(event){
  event.preventDefault()
  this.setState({
    sortOptions:'authors'
  })

}

  /**
   * @method sortByCategories
   * @memberof SortSidebar
   * @description Display list of sorted book by categories
   * @param {event} event handler 
   */
sortByCategories(event){
  event.preventDefault()
  this.setState({
    sortOptions:'genres'
  })
}
  render(){
    return(
      <RightSidebar
        rightSidebarClass = "sort-sidebar"
        sortByAuthors={this.sortByAuthors}
        sortByCategories = {this.sortByCategories}>
        {
          this.state.sortOptions === 'authors' &&
          <AuthorBookLists/>
        }{
          this.state.sortOptions === 'genres' &&
          <GenreBookLists/>
        }
      </RightSidebar>
    )
  }
}

export default SortSidebar