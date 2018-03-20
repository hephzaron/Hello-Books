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

import Button from 'Forms/Button';

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
      <CardText>
        {description}
      </CardText>
      <CardActions>
        {props.cardActions && props.cardActions.map(actions=>
          <Button
            className = "btn-success"
            name = {actions.label}
            onClick = {actions.onClick}
            icon = {false}
            disabled = {props.isLoading}/>)}
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