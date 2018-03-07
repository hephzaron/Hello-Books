import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomCard from './CustomCard'

class CardComponent extends Component{
  constructor(props){
    super(props);
    this.state ={
      isLoading:false
    }
  }

  componentWillReceiveProps(){
    this.setState({
      isLoading:true
    })
  }

  componentWillUnmount(){
    this.setState({
      isLoading:true
    })
  }

  render(){
    return(
      <CustomCard
        book = {this.props.book}
        isLoading = {this.state.isLoading}
        cardActions = {this.props.cardActions}/>
    )
  }

}

CardComponent.propTypes =  {
  book: PropTypes.object.isRequired,
  cardActions: PropTypes.array
}

export default CardComponent;