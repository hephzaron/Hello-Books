import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * @class Class to represent a modal component
 * @param {object} -[props] component properties
 * @returns {JSX}
 */

const propTypes = {
   onClose: PropTypes.func.isRequired,
   children: PropTypes.node.isRequired
 }

class Modal extends Component {
  constructor(props){
    super(props);
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
    this.handleDialogClick = this.handleDialogClick.bind(this);
    this.listenKeyboard = this.listenKeyboard.bind(this);
  }

  /**
   * @method listenKeyboard - Listens to key press events
   * @memberof  Modal class
   * @param {object} [event]
   * @return {void}
   */
  listenKeyboard(event){
    if(event.key === 'Escape' || event.keyCode === 27 ){
      this.props.onClose()
    }
  }

  /**
   * @method {handleOverlayClick}
   * @description - handles any click on overlay element
   * @memberof  {Modal}
   * @param {void}
   */

   handleOverlayClick(){
     this.props.onClose();
   }
   /**
    * @description Prevents further ppropagation of current event on Dialog element
    * @method { handleDialogClick }
    * @param {function} event
    * @memberof Modal class 
    */
   handleDialogClick(event){
     event.stopPropagation();
   }

  /**
   * @method -Component's lifecycle methods(add and remove event listener)
   * @memberof Modal class
   * @param { void }
   */

  componentDidMount(){
    if(this.props.onClose){
      window.addEventListener('keydown',this.listenKeyboard,true);
    }
  }

  componentWillUnmount(){
    if(this.props.onClose){
      window.removeEventListener('keydown',this.listenKeyboard,true);
    }
  }
  render(){
    {/* Set custom styles for overlay, content and dialog element*/}
    const overlayStyle = this.props.overlayStyle ?
      this.props.overlayStyle : {};
    const contentStyle = this.props.contentStyle ?
      this.props.contentStyle : {};
    const dialogStyle = this.props.dialogStyle ?
      this.props.dialogStyle : {};

    return(
      <div>
        <div className="modal-overlay-div" style={overlayStyle}/>
        <div className="modal-content-div" style ={contentStyle}
          onClick = {this.handleOverlayClick}>
          <div className="modal-dialog-div" style={dialogStyle}
          onClick ={this.handleDialogClick}>
              <span className="glyphicon glyphicon-remove" 
                onClick = {this.handleOverlayClick}>
              </span>
          {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = propTypes

export default Modal;