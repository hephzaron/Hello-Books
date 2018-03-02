/**
 * @description This mirrors an array element and returns an object
 * @param {array} - array to mirror
 * @return {object} mirrored keys and values
 */

const mirrorKeys = (arr) => {
    return arr.reduce((obj, str) => {
        obj[str] = str;
        return obj
    }, {});
};

export default mirrorKeys;