import Validator from 'validator';
import { isEmpty } from 'lodash';

/**
 * @class defaultClass
 * @description Validate inputs for create and update book fields
 * @param {object} inputs
 * @return {object} isValid and errors
 */

export default (inputs) {
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
    if (Number.isNaN(parseInt(genreId, 10))) {
        errors.genreId = 'Please select a book category'
    }
    if (!Validator.isISBN(ISBN)) {
        errors.ISBN = 'Field of type ISBN is required'
    }
    if (!id) {
        if (Number.isNaN(parseInt(quantity, 10))) {
            errors.quantity = 'Field must be of numeric type'
        }
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
};