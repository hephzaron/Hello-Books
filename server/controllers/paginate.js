module.exports = {
    paginate(page, count) {
        let re = /^[0-9]*$/;
        if ((re.test(page) && re.test(count)) !== true) {
            return {
                errors: 'Invalid page or count'
            }
        }
        let limit = count
        let offset = (page - 1) * limit
        return {
            limit,
            offset
        }
    },
    returnObject(object, type) {
        if (type === 'books') {
            if (object.length > 1) {
                return {
                    books: object
                }
            } else {
                return {
                    book: object
                }
            }
        } else if (type === 'authors') {
            if (object.length > 1) {
                return {
                    authors: object
                }
            } else {
                return {
                    author: object
                }
            }
        }
    }
}