import Validator from 'validator';
import { isEmpty } from 'lodash';

/**
 * @function defaultFunction
 * @description Validate inputs for user credentials
 * @param {object} inputs 
 * @param{string} type
 * @return {object} isValid and errors
 */

export default function(inputs, type) {
    let errors = {};
    const {
        username,
        email,
        password,
        confirmPassword
    } = inputs;

    if (type === 'login' || type === 'change-password' || type === 'register') {
        let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (Validator.isEmpty(password)) {
            errors.password = 'Please enter password'
        } else if (!Validator.isEmpty(password)) {
            if (username === password) {
                errors.password = 'Password must be different from username'
            } else if (!re.test(password)) {
                errors.password = 'Password must contain at least one number,one lowercase and uppercase and minimum of 8 digit'
            }
        }
    }
    if (type !== 'login' && type !== 'reset-password') {
        if (Validator.isEmpty(confirmPassword)) {
            errors.confirmPassword = 'Please confirm password'
        }
        if (!Validator.equals(password, confirmPassword)) {
            errors.confirmPassword = 'Password does not match'
        }
    }
    if (type !== 'change-password') {
        let re = /^\w+$/;
        if (type === 'register') {
            if (Validator.isEmpty(username)) {
                errors.username = 'Please specify username'
            }
        }
        if (Validator.isEmpty(email)) {
            errors.email = 'Please specify email'
        }
        if ((!Validator.isEmail(email)) && (!Validator.isEmpty(email))) {
            errors.email = 'Please enter a valid email address'
        }
        if ((!re.test(username)) && (!Validator.isEmpty(username))) {
            errors.username = 'Username must contain only letters, numbers and underscores'
        }
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
};