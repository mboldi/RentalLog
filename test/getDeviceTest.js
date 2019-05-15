const assert = require('assert');
const expect = require('chai').expect;

const getDeviceMW = require('../middleware/device/getDevice');

describe('Get device data', function () {
    it('not getting result in findOne', function () {
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
        })
    });

    it('getting device and saving it to res.local', function () {
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
        })
    });

    it('error in findOne', function () {
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
        });
    });
});