import React,{ Component } from 'react';
import { Link } from 'react-router';
import {  connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes, { func } from 'prop-types';
import { loginUser, signin, setCurrentUser } from 'Actions/userAuth';
import { loadModal, showModal, hideModal } from 'Actions/modal';
import validateUser from 'Utils/validators/user';
import { addFlashMessage } from 'Actions/flashMessage';
import SigninForm from './SigninForm';
/**Modal type constant */
import modalTypes from  'Modal/modalTypes'
const { RESET_PASSWORD_MODAL } = modalTypes;

const contextTypes = {
  router: PropTypes.object.isRequired
};

const propTypes = {
  addFlashMessage: PropTypes.func,
  setCurrentUser: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  signin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loadModal: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired
};

/*Make state available globally */
let state = {
  user: {
    email: '',
    password: '',
    oauthID: ''
  },
  isLoading: false,
  isChecked: true,
  errors: {}
};

/**
 * @description -SignIn component
 * @class SignIn
 * @extends {React.Component}
 */

class SignIn extends Component {
  /**
   * @description This creates an instance of SigninForm
   * @param {object} props - comoponent props
   */

  constructor(props){
    super(props);
    this.state = state

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
  }

  componentWillUnmount(){
    //Remember state for the next mount
    state = this.state
  }

  /**
   * @description This handles form input onChange event
   * @param {object} event - event handler
   * @returns {undefined}
   * @memberof SignIn
   */
  onChange(event) {
    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]:event.target.value
      }
    });
  }

 /**
   * @description This submits user form on completion
   * @param {object} event - event handler
   * @returns {undefined}
   * @memberof SignIn
   */
  onSubmit(event) {
    event.preventDefault();
    
    if(!this.isFormValid()){ return; }
    
    this.setState({ isLoading: true });
    this.props.signin(this.state.user)
      .then((data) => {
        if(data.response && data.response.status >= 400){
          this.setState({
            isLoading: false
          });
        }else{
          this.context.router.push('/user-profile');
        }
      });
  }

  toggleCheckbox(){
    this.setState({
      isChecked: !this.state.isChecked
    })
  }

  /**
   * @description This validates user entry
   * @param {void}
   * @returns {boolean} isValid
   * @memberof SignIn
   */

  isFormValid(){
    const { errors, isValid } = validateUser(this.state.user, 'login');
    if(!isValid) {
      this.setState({errors});
    }
    return isValid;
  };


  /**
   * @description Handles user request to reset password
   * @method {handleResetClick}
   * @param { void }
   * @memberof SignIn
   */
  
   handleResetClick(){
     this.props.showModal(RESET_PASSWORD_MODAL)
    }


  /**
   * @description Renders component
   * @returns {object} JSX
   * @memberof SignIn
   */
render() {

    return(
      <SigninForm
        validationError = {this.state.errors}
        signin = {this.props.signin}
        addFlashMessage = {this.props.addFlashMessage}
        setCurrentUser = {this.props.setCurrentUser}
        loginUser = {this.props.loginUser}
        isLoading = {this.state.isLoading}
        onChange = {this.onChange}
        onSubmit = {this.onSubmit}
        user = {this.state.user}
        isChecked = {this.state.isChecked}
        toggleCheckbox = {this.toggleCheckbox}
        showModal = {this.props.showModal}
        handleResetClick = {this.handleResetClick}/>
    )
  }

}

SignIn.contextTypes = contextTypes;

SignIn.propTypes = propTypes;

/**
 * @description Maps state from store to props
 * @param {object} state - redux store state
 * @returns {object} map state to props 
 * */
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});



/**
 * @description Maps dispatch to props
 * @param {object} dispatch
 * @returns {object} map dispatch to props 
 */

const actionCreators = {
  signin,
  addFlashMessage,
  setCurrentUser,
  loginUser,
  loadModal,
  showModal
}



export { SignIn }
export default connect(mapStateToProps, actionCreators)(SignIn);