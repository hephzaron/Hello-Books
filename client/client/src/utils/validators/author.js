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

    if (Validator.isEmpty(firstName)) {
        errors.firstName = "Author's first name is required";
    }
    if (Validator.isEmpty(lastName)) {
        errors.lastName = "Author's last name is required";
    }
    if (Validator.isEmpty(`${dateOfBirth}`)) {
        errors.dateOfBirth = "Author's date of birth is required";
    }
    if (!Validator.isDate(`${dateOfBirth}`)) {
        errors.dateOfBirth = 'This field must be of date type';
    }
    if (!Validator.isDate(`${dateOfDeath}`) && !Validator.isEmpty(`${dateOfDeath}`)) {
        errors.dateOfBirth = 'This field must be of date type';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};