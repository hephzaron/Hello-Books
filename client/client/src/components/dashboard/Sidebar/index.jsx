import React , { Component } from 'react';
import CustomSidebar from './CustomSidebar';
import $ from 'jquery';


class Sidebar extends Component {
  constructor(props){
    super(props);
    this.onClickCreate = this.onClickCreate.bind(this);
  }

  componentWillUnmount(){
    $(".admin-sidebar btn").removeClass("dropdown-menu")
  }

  onClickCreate(event){
    alert('you click me')
  }
  render(){
    return(
      <CustomSidebar
        sidebarClass = "admin-sidebar"
        onClickCreate = {this.onClickCreate}
      />
    )
  }
}

export default Sidebar