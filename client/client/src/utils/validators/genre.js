import Validator from 'validator';
import { isEmpty } from 'lodash';

/**
 * @class defaultClass
 * @description Validate inputs for book categories
 * @param {object} inputs
 * @return {object} isValid and errors
 */

export default (inputs) {
    let errors = {};
    const {
        id,
        name
    } = inputs;

    if (Validator.isEmpty(name)) {
        errors.name = 'This field is required'
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
};