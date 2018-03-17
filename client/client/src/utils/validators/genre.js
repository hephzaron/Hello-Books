import Validator from 'validator';
import { isEmpty } from 'lodash';


const findBookGenre = (genres, item) => {
        const bookFound = genres.filter((genre) => {
            return genre.name === item
        })
        return { bookFound }
    }
    /**
     * @class defaultClass
     * @description Validate inputs for book categories
     * @param {object} inputs
     * @return {object} isValid and errors
     */

export default (inputs, type) => {
    let errors = {};
    const {
        id,
        name,
        genres,
        genreName
    } = inputs;

    let validText = /^\w*(\s*\w*)*$/i

    if (type === 'create') {

        if (Validator.isEmpty(name) || !name) {
            errors.name = 'This field is required'
        }
        if (!Validator.isEmpty(name) && !validText.test(name)) {
            errors.name = 'Please enter a valid book category'
        }

    }
    if (type === 'select') {
        if (Validator.isEmpty(genreName)) {
            errors.genreName = 'Please select a book category'
        }
        if (!Validator.isEmpty(genreName)) {
            const { bookFound } = findBookGenre(genres, genreName);
            if (!validText.test(genreName)) {
                errors.genreName = 'Please select from the list of valid options'
            } else if (isEmpty(bookFound)) {
                errors.genreName = 'Book category does not exist'
            }
        }

    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
};