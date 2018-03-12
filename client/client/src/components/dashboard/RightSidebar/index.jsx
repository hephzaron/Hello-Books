import React , { Component } from 'react';
import RightSidebar from './RightSidebar';
import BookLists from './BookLists';
import { toggleElementClass } from 'Utils/toggle';


class SortSidebar extends Component {
  constructor(props){
    super(props);
    this.sortByAuthors = this.sortByAuthors.bind(this);
    this.sortByCategories = this.sortByCategories.bind(this);
  }

  componentDidMount(){
    toggleElementClass({
        toggleType: 'double',
        previous:'.nested-list .glyphicon-user',
        next:'.glyphicon-tasks',
        toggledClass: 'active-r'
    });
  }
sortByAuthors(event){
  event.preventDefault()

}
sortByCategories(event){
  event.preventDefault()
}
  render(){
    return(
      <RightSidebar
        rightSidebarClass = "sort-sidebar"
        sortByAuthors={this.sortByAuthors}
        sortByCategories = {this.sortByCategories}>
        <BookLists/>
      </RightSidebar>
    )
  }
}

export default SortSidebar