import React from "react";
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  Card, 
  CardActions, 
  CardHeader, 
  CardMedia, 
  CardTitle, 
  CardText 
}from 'material-ui/Card';


const CustomCard = (props) => {
  const {
    title,
    coverPhotoURL,
    description,
    Authors,
    ISBN
  } = props.book;

  const defaultStyle =  {width:'100%',padding:0, margin:0};

  return (
    <Card containerStyle={defaultStyle}>
      <CardHeader
        textStyle ={defaultStyle}
        style = {defaultStyle}
        title={title}
        subtitle = {`${(Authors.length > 1) ? Authors.reduce((prevAuthor, nextAuthor)=>{
          return `${prevAuthor['fullName']}, ${nextAuthor['fullName']}`
        }):Authors[0].fullName}`}
      />
      <CardMedia
        overlay = {<CardTitle subtitle={ISBN}/>}>
        <img src={coverPhotoURL} alt={coverPhotoURL.substr(coverPhotoURL.lastIndexOf('/')+1)}/>
      </CardMedia>
      <CardText
        textStyle ={defaultStyle}
        style = {defaultStyle}>
        {description}
      </CardText>
      <CardActions>
        {props.cardActions && props.cardActions.map(actions=>
          <span
            className = {
              classnames(`${actions.iconClass ? actions.iconClass:''}`)
            }
            onClick = {actions.onClick}
            disabled = {props.isLoading}>
            {actions.label}
          </span>)}
      </CardActions>
    </Card>
  )
};

CustomCard.propTypes = {
  book: PropTypes.object.isRequired,
  cardActions: PropTypes.array,
  isLoading: PropTypes.bool.isRequired
}

export default CustomCard;