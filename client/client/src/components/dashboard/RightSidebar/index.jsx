import React , { Component } from 'react';
import RightSidebar from './RightSidebar';
import AuthorBookLists from './AuthorBookLists';
import GenreBookLists from './GenreBookLists';
import { toggleElementClass } from 'Utils/toggle';


class SortSidebar extends Component {
  constructor(props){
    super(props);

    this.state = {
      sortOptions: 'authors'
    }
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
  this.setState({
    sortOptions:'authors'
  })

}
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