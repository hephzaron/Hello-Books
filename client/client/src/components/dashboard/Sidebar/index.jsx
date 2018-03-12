import React , { Component } from 'react';
import CustomSidebar from './CustomSidebar';
import { toggleElementClass } from 'Utils/toggle';


class Sidebar extends Component {
  constructor(props){
    super(props);
    this.onClickCreate = this.onClickCreate.bind(this);
  }

  componentDidMount(){
    toggleElementClass({
        toggleType: 'double',
        previous:'.btn-l',
        next:'.btn-r',
        toggledClass: 'active'
    });
  }

  onClickCreate(event){
    event.preventDefault()
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