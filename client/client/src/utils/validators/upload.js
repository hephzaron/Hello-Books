import Validator from 'validator';
import { isEmpty } from 'lodash';


/**
 * @function defaultFunction
 * @description Validate file type and size
 * @param {object} file 
 * @param{string} type
 * @return {object} isValid and errors
 */
export default function(file, type) {
    let errors = {};
    const {
        name,
        size
    } = file;

    if (type === 'image') {
        let re = /\.(jpg|png|jpeg)$/i
        let len = /^\w{1,10}\.(jpg|png|jpeg)$/i
        if (Validator.isEmpty(name)) {
            errors.name = 'Please choose a file'
        } else if (!Validator.isEmpty(name) && size <= 0) {
            errors.size = 'Image file invalid, please choose a valid file'
        }
        if (!Validator.isEmpty(name) && size > 0) {
            if (!re.test(name)) {
                errors.name = 'Image file can only be of type JPG, JPEG and PNG'
            } else if ((size / 1024).toFixed(0) > 300) {
                errors.size = 'Image size cannot be greater than 300kb'
            } else if (!len.test(name)) {
                errors.name = "Image name must be alphanumeric and can contain underscore not more than 10 characters"
            }
        }
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}