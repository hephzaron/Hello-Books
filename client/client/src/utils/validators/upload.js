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
    const { image, doc } = file;

    if (type === 'image') {
        let re = /\.(jpg|png|jpeg)$/i
        let len = /^\w{1,10}\.(jpg|png|jpeg)$/i
        if (Validator.isEmpty(image.name)) {
            errors.image = 'Please choose a file'
        } else if (!Validator.isEmpty(image.name) && image.size <= 0) {
            errors.image = 'Image file invalid, please choose a valid file'
        }
        if (!Validator.isEmpty(image.name) && image.size > 0) {
            if (!re.test(image.name)) {
                errors.image = 'Image file can only be of type JPG, JPEG and PNG'
            } else if ((image.size / 1024).toFixed(0) > 300) {
                errors.image = 'Image size cannot be greater than 300kb'
            } else if (!len.test(image.name)) {
                errors.image = "Image name must be alphanumeric and can contain underscore not more than 10 characters"
            }
        }
    }

    if (type === 'document') {
        let re = /\.(pdf)$/i
        let len = /^\w{1,30}\.(pdf)$/i
        if (Validator.isEmpty(doc.name)) {
            errors.doc = 'Please choose a file'
        } else if (!Validator.isEmpty(doc.name) && doc.size <= 0) {
            errors.doc = 'Doc file invalid, please choose a valid file'
        }
        if (!Validator.isEmpty(doc.name) && doc.size > 0) {
            if (!re.test(doc.name)) {
                errors.doc = 'Doc can only be of type PDF'
            } else if ((doc.size / 1024).toFixed(0) > 20000) {
                errors.doc = 'Doc size cannot be greater than 20MB'
            } else if (!len.test(doc.name)) {
                errors.doc = "Doc name must be alphanumeric and can contain underscore and maximumof 30 characters"
            }
        }
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}