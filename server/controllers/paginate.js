module.exports = {
    paginate(page, count) {
        let limit = count ? count : null
        let offset = page ? (page - 1) * limit : 0
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