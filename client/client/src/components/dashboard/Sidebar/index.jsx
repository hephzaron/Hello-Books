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

  componentWillMount(){
  }
  componentDidMount(){
    $(".btn-l").click(()=>{
      if($(".btn-r").hasClass("active")&&!$(".btn-l").hasClass("active")){
        $(".btn-r").removeClass('active');
        $(".btn-l").addClass("active")
      }
    });
    
    $(".btn-r").click(()=>{
      if($(".btn-l").hasClass('active')&&!$(".btn-r").hasClass("active")){
        $(".btn-l").removeClass('active');
        $(".btn-r").addClass("active")
      }
    })
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