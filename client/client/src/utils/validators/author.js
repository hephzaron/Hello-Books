import Validator from 'validator';
import { isEmpty } from 'lodash';

/**
 * @class defaultClass
 * @description Validate inputs for author fields
 * @param {object} inputs
 * @return {object} isValid and errors
 */

export default (inputs) => {
    const errors = {};
    const {
        firstName,
        lastName,
        dateOfBirth,
        dateOfDeath
    } = inputs;

    let validDate = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/g
    let validText = /^\w*(\s*\w*)*$/i

    if (Validator.isEmpty(firstName)) {
        errors.firstName = "Author's first name is required";
    }
    if (Validator.isEmpty(lastName)) {
        errors.lastName = "Author's last name is required";
    }
    if (Validator.isEmpty(dateOfBirth)) {
        errors.dateOfBirth = "Author's date of birth is required";
    }
    if (!Validator.isEmpty(firstName) && !validText.test(firstName)) {
        errors.firstName = "A valid name is required"
    }
    if (!Validator.isEmpty(lastName) && !validText.test(lastName)) {
        errors.lastName = "A valid name is required"
    }
    if (!validDate.test(dateOfBirth) && !Validator.isEmpty(dateOfBirth)) {
        errors.dateOfBirth = 'This field must be of date type';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};