import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { setTimeout, clearTimeout } from 'timers';

/**
 * @description Set timout component to togglle component visibility
 * @class SetTimout
 * @extends {Component}
 */

class SetTimout extends Component {
  /**
   * @description This instantiate the SetTimout component
   * @param {object} props - component props
   * @memberof SetTimeout
   */

  constructor(props) {
    super(props);
    this.state = {
      isVisible: true
    };
  }

  /**
   * @description Lifecycle method is invoked when component mounts
   * @param {void}
   * @returns {undefined}
   * @memberof SetTimeout
   */
  componentDidMount(){
    this.setTimer();
  }

  /**
   * @description Lifecycle method wil be invoked as soon as props is received
   * @param {object} nextProps - lifecycle next props
   * @returns {undefined}
   * @memberof SetTimeout
   */

  componentWillReceiveProps(nextProps){
    if(nextProps.children !== this.props.children){
      this.setTimer();
      this.setState({
        isVisible: true
      });
    }
  }

  /**
   * @description Lifecycle method invoked when component unmounts
   * @param {void}
   * @returns {undefined}
   * @memberof SetTimeout
   */

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  /**
   * @description Set timer method
   * @param {void}
   * @returns {undefined}
   * @memberof SetTimeout
   */
  setTimer() {
    //clear existing timer object
    if(this.timer != null){
      clearTimeout(this.timer)
    }
    // hide after duration elapse
    this.timer = setTimeout(()=>{
      this.setState({isVisible:false});
      this.timer = null;
    },this.props.interval);
  }

  /**
   * @description This renders container component
   * @returns {JSX} JSX
   * @memberof SetTimeout
   */
  render () {
    return this.state.isVisible ?
      <div>{this.props.children}</div>:
      <span/>
  }
}

SetTimout.propTypes = {
  children: PropTypes.node.isRequired,
  interval: PropTypes.number.isRequired
}

SetTimout.defaultProps = {
  interval: 10000
}

export default SetTimout;

