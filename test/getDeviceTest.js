const assert = require('assert');
const expect = require('chai').expect;

const getDeviceMW = require('../middleware/device/getDevice');

describe('Get device data', function () {
    it('not getting result in findOne', function (done) {
        let req = {
            params: {
                id: 'nagyonID'
            }
        };
        let res = {};

        const objRepo = {
            deviceModel: {
                findOne: function(params, call) {
                    call(undefined, undefined);
                }
            }
        };

        getDeviceMW(objRepo)(req, res, function () {
            expect(res.local).to.eql({});
            done();
        })
    });

    it('getting device and saving it to res.local', function (done) {
        let req = {
            params: {
                id: 'nagyonID'
            }
        };
        let res = {};

        const objRepo = {
            deviceModel: {
                findOne: function(params, call) {
                    call(undefined, 'device');
                }
            }
        };

        getDeviceMW(objRepo)(req, res, function () {
            expect(res.local).to.eql('device');
            done();
        })
    });

    it('error in findOne', function (done) {
        let req = {
            params: {
                id: 'nagyonID'
            }
        };
        let res = {local: {}};

        const objRepo = {
            deviceModel: {
                findOne: function (params, call) {
                    call('error', 'device');
                }
            }
        };

        getDeviceMW(objRepo)(req, res, function () {
            expect(res.local.error).to.eql('error in findOne');
            done();
        });
    });
});