import mirrorKeys from 'Utils/mirrorKeys';

/**
 * @description An array of modal types
 * @type [Array]
 */

const modalTypes = [
    'RESET_PASSWORD_MODAL',
    'TERMS_OF_SERVICE_MODAL',
    'MISSION_STATEMENT_MODAL',
    'VISION_STATEMENT_MODAL',
    'PASSION_STATEMENT_MODAL',
    'ABOUT_US_MODAL',
    'EDIT_BOOK_MODAL',
    'ASSIGN_AUTHOR_MODAL',
    'EDIT_AUTHOR_MODAL'
]

export default mirrorKeys(modalTypes);