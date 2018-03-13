import React, { Component } from 'react';

/**
 * @class ErrorBoundary
 * @description Handles error within react component
 * @param { object } -props
 * @extends React.Component
 * @returns { JSX }
 */

class ErrorBoundary extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      hasError: false,
      errorMessage: ''
    }
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      errorMessage: error.message
    });
  }

  render(){
    if(this.state.hasError){
      return(
        <div className="dashboard-panel dashboard-panel-error">
          <div className="panel-header">
            <h3>{this.state.errorMessage}</h3>
          </div>
          <div className="panel-content">
            <div className="sad-face"></div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary;