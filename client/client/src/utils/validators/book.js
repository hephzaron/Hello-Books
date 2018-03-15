import Validator from 'validator';
import { isEmpty } from 'lodash';

/**
 * @class defaultClass
 * @description Validate inputs for create and update book fields
 * @param {object} inputs
 * @return {object} isValid and errors
 */

export default (inputs) => {

    let validText = /^\w*(\s*\w*)*$/i

    let errors = {};
    const {
        id,
        title,
        genreId,
        description,
        ISBN,
        quantity,
    } = inputs;

    if (Validator.isEmpty(title)) {
        errors.title = 'Please specify book title'
    }
    if (Validator.isEmpty(description)) {
        errors.description = 'Give a brief description of book here'
    }
    if (!Validator.isEmpty(title) && !validText.test(title)) {
        errors.title = "Please enter a valid book title"
    }
    if (Number.isNaN(parseInt(genreId, 10))) {
        errors.genreId = 'Please select a book category'
    }
    if (Number.isNaN(parseInt(quantity, 10))) {
        errors.quantity = 'Field must be of numeric type'
    }
    if (!Validator.isISBN(ISBN)) {
        errors.ISBN = 'Field of type ISBN is required'
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
};