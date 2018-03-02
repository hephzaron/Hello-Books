let assert = require('chai').assert;
let paginate = require('../../../server/controllers/paginate').paginate;
let returnObject = require('../../../server/controllers/paginate').returnObject;

describe('PAGINATE Valid entries', () => {
    let page, count
    it('it should return limit of 5 and offset 0 for first page', () => {
        page = 1
        count = 5
        const { limit, offset, errors } = paginate(page, count)
        assert.equal(limit, 5)
        assert.equal(offset, 0)
        assert.equal(errors, undefined)
    });

    it('it should return limit of 5 and offset by 5 records for second page', () => {
        page = 2
        count = 5
        const { limit, offset, errors } = paginate(page, count)
        assert.equal(limit, 5)
        assert.equal(offset, 5)
        assert.equal(errors, undefined)
    });

    it('it should return limit of 5 and offset by 10 records for third page', () => {
        page = 3
        count = 5
        const { limit, offset, errors } = paginate(page, count)
        assert.equal(limit, 5)
        assert.equal(offset, 10)
        assert.equal(errors, undefined)
    });
});

describe('PAGINATE Invalid entries', () => {

    it('it should set no limit and offset where none is specified', () => {
        const { limit, offset, errors } = paginate()
        assert.equal(limit, undefined);
        assert.equal(offset, undefined);
        assert.equal(errors, 'Invalid page or count');
    });
    it('it should set no limit and offset where entry is out of bound', () => {
        const { limit, offset, errors } = paginate(-1, -5)
        assert.equal(limit, undefined);
        assert.equal(offset, undefined);
        assert.equal(errors, 'Invalid page or count');
    });

    it('it should return errors for a non number limit entry', () => {
        const { limit, offset, errors } = paginate('a1/2', 5)
        assert.equal(limit, undefined);
        assert.equal(offset, undefined);
        assert.equal(errors, 'Invalid page or count');
    });

    it('it should return errors for a non number count entry', () => {
        const { limit, offset, errors } = paginate(2, ' b7')
        assert.equal(limit, undefined);
        assert.equal(offset, undefined);
        assert.equal(errors, 'Invalid page or count');
    });
    it('it should return errors for a non number count and page entry', () => {
        const { limit, offset, errors } = paginate('m34', ' b7')
        assert.equal(limit, undefined);
        assert.equal(offset, undefined);
        assert.equal(errors, 'Invalid page or count');
    });

});

describe('Return keys based on number of objects', () => {
    const multiple = [{
        first: 'first'
    }, {
        second: 'second'
    }]
    const single = [{
        single: 'single'
    }]
    it('it should return key \'books\' for array length of \'books\' type > 1', () => {
        let result = returnObject(multiple, 'books')
        assert.equal(Object.keys(result), 'books');
        assert.equal(result['books'], multiple)
    });

    it('it should return key \'book\' for array length of \'books\' type = 1', () => {
        let result = returnObject(single, 'books')
        assert.equal(Object.keys(result), 'book');
        assert.equal(result['book'], single)
    });

    it('it should return key \'authors\' for array length of \'authors\' type > 1', () => {
        let result = returnObject(multiple, 'authors')
        assert.equal(Object.keys(result), 'authors');
        assert.equal(result['authors'], multiple)
    });

    it('it should return key \'author\' for array length of \'authors\' type = 1', () => {
        let result = returnObject(single, 'books')
        assert.equal(Object.keys(result), 'book');
        assert.equal(result['book'], single)
    });
});