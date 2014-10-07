var assert = require('chai').assert;

var parseAttributes = require('../');

describe('parseAttributes utility', function () {
    describe('when called with an empty string', function(){
        it('should return an empty object', function () {
            var returnVal = parseAttributes('');
            assert.deepEqual(returnVal, {});
        });
    });

    describe('when called with a string containing an empty attribute', function(){
        it('should return an object containing the attribute key with value `true`', function () {
            var returnVal = parseAttributes('foo');
            assert.propertyVal(returnVal, 'foo', true);
        });
    });

    describe('when called with a string containing attributes', function(){
        var description = 'should return an corresponding object';

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

        describe('without spaces between delimeters', function(){
            it(description, function () {
                var returnVal = parseAttributes(' foo="bar" ');
                assert.propertyVal(returnVal, 'foo', 'bar');
            });
        });
    });
});
