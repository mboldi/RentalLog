const assert = require('assert');
const expect = require('chai').expect;

const getUserDataMW = require('../middleware/user/getUserData');

describe('GetUserData', function () {
    it('userdata should be bela', function (done) {
        const objRepo = {
            userModel: {
                findOne: function(params, func) {
                    func(undefined, 'bela');
                }
            }
        };

        let req = {session: {userid: 'alma'}};
        let res = {local: {}};

        getUserDataMW(objRepo)(req, res, function (err) {
            expect(res.local.userData).to.be.equal('bela');
            expect(err).to.eql(undefined);
            done();
        });
    });

    it('there should be an error', function (done) {
        let objRepo = {
            userModel: {
                findOne: function(params, func) {
                    func('micsoda hiba ez itten', 'bela');
                }
            }
        };

        let req = {session: {userid: 'alma'}};
        let res = {local: {}};

        getUserDataMW(objRepo)(req, res, function (err) {
            expect(res.local.userData).to.eql(undefined);
            expect(err).to.eql('err');
            done();
        });
    });
});