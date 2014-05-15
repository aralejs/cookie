
var expect = require('expect.js');
var Cookie = require('../index');

describe('Cookie', function() {

    describe('get', function() {

        document.cookie = '_sea_test_1=1';
        document.cookie = '_sea_test_2';
        document.cookie = '_sea_test_3=';
        document.cookie = '_sea_test_4[t]=xx';

        it.skip('should return the cookie value for the given name.', function() {

            expect(Cookie.get('_sea_test_1')).to.equal('1');
            expect(Cookie.get('_sea_test_2')).to.equal('');
            expect(Cookie.get('_sea_test_3')).to.equal('');
            expect(Cookie.get('_sea_test_4[t]')).to.equal('xx');

        });

        it('should return undefined for non-existing name.', function() {

            expect(Cookie.get('_sea_test_none')).to.equal(undefined);
            expect(function(){ Cookie.get(true); }).to.throwError();
            expect(function(){ Cookie.get({}); }).to.throwError();
            expect(function(){ Cookie.get(null); }).to.throwError();

        });

        it('should throw error for invalid name.', function() {

            expect(function(){ Cookie.get(true); }).to.throwError();
            expect(function(){ Cookie.get({}); }).to.throwError();
            expect(function(){ Cookie.get(null); }).to.throwError();

        });

    });

    describe('set', function() {

        it('should set a cookie with a given name and value.', function() {

            Cookie.set('_sea_test_11', 'xx');
            expect(Cookie.get('_sea_test_11')).to.equal('xx');

            Cookie.set('_sea_test_12', 'xx', { expires: -1 });
            expect(Cookie.get('_sea_test_12')).to.equal(undefined);

            Cookie.set('_sea_test_13', '2', {
                expires: new Date(2099, 1, 1),
                path: '/'
            });
            expect(Cookie.get('_sea_test_13')).to.equal('2');

            Cookie.remove('_sea_test_14');
            Cookie.set('_sea_test_14', '4', {
                domain: document.domain,
                path: '/',
                secure: true
            });
            expect(Cookie.get('_sea_test_14')).to.equal(undefined);

        });

    });

    describe('remove', function() {

        it('should remove a cookie from the machine.', function() {

            Cookie.set('_sea_test_21', 'xx');
            Cookie.remove('_sea_test_21');
            expect(Cookie.get('_sea_test_21')).to.equal(undefined);

            Cookie.set('_sea_test_22', 'xx', {
                expires: new Date(2099, 1, 1),
                path: '/'
            });
            Cookie.remove('_sea_test_22', {
                path: '/'
            });
            expect(Cookie.get('_sea_test_22')).to.equal(undefined);

        });
    });

});
