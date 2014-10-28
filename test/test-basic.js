var assert = require('chai').assert;

var parseAttributes = require('../');

describe('parseAttributes function', function () {
    describe('when called with an empty string', function(){
        it('should return an empty object', function () {
            var returnVal = parseAttributes('');
            assert.deepEqual(returnVal, {});
        });
    });

    describe('when called with a string containing a boolean attribute', function(){
        it('should return an object containing the attribute key with value `true`', function () {
            var returnVal = parseAttributes('foo');
            assert.propertyVal(returnVal, 'foo', true);
        });
    });

    describe('when called with a string containing one attribute', function(){
        var description = 'should return a corresponding object';

        describe('without quotes', function(){
            it(description, function () {
                var returnVal = parseAttributes('foo=bar');
                assert.propertyVal(returnVal, 'foo', 'bar');
            });
        });

        describe('with single quotes', function(){
            it(description, function () {
                var returnVal = parseAttributes('foo=\'bar\'');
                assert.propertyVal(returnVal, 'foo', 'bar');
            });
        });

        describe('with double quotes', function(){
            it(description, function () {
                var returnVal = parseAttributes('foo="bar"');
                assert.propertyVal(returnVal, 'foo', 'bar');
            });
        });

        describe('with spaces between delimeters', function(){
            it(description, function () {
                var returnVal = parseAttributes(' foo = "bar" ');
                assert.propertyVal(returnVal, 'foo', 'bar');
            });
        });

        describe('with leading and trailing spaces', function(){
            it(description, function () {
                var returnVal = parseAttributes(' foo="bar" ');
                assert.propertyVal(returnVal, 'foo', 'bar');
            });
        });

        describe('with a spinal-case attribute', function(){
            it('should return an object with corresponding camelCase key', function () {
                var returnVal = parseAttributes('foo-bar="foobar"');
                assert.propertyVal(returnVal, 'fooBar', 'foobar');
            });
        });
    });

    describe('when called with a string containing multiple boolean attributes', function () {
        it('should return an object with all boolean attributes set to `true`', function () {
            var returnVal = parseAttributes('foo bar baz');
            assert.deepEqual(Object.keys(returnVal), ['foo', 'bar', 'baz']);
        });
    });

    describe('when called with a string containing multiple attributes', function () {
        it('should return a corresponding object', function () {
            var returnVal = parseAttributes('foo="1" bar=2 baz="3"');
            assert.deepEqual(returnVal, { foo: '1', bar: '2', baz: '3' });
        });
    });

    describe('invalid examples', function () {

        describe('JSON in attribute value', function () {
            it('breaks and does not respect escaped quotes', function () {
                var returnVal = parseAttributes('foo="{\"name\":\"bar\"}"');
                assert.notDeepEqual(returnVal, { foo: '{"name":"bar"}' }, 'output is not as expected');
                assert.equal(returnVal.foo, '{', 'foo contains only opening brace');
            });
        });

    });
});
