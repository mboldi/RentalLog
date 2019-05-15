const assert = require('assert');
const expect = require('chai').expect;

const updateDeviceMW = require('../middleware/device/updateDevice');

describe('Update device test', function () {
    it('There should not be enough values', function () {
        const objRepo = {
            deviceModel: function() {}
        };

        let req = {query: {}};
        let res = {local: {}};

        updateDeviceMW(objRepo)(req, res, function () {
            expect(res.local.err).to.equal('not enough values');
        });
    });

    it('MW should create device values', function () {
        const objRepo = {
            deviceModel: function() {
                this.save = function(call) {
                    call();
                }
            }
        };

        let req = {
            params: {},
            query: {
                deviceName: 'nev',
                deviceValue: 1234,
                deviceQuantity: 4,
            }
        };
        let res = {local: {}};

        updateDeviceMW(objRepo)(req, res, function () {
            expect(res.local.err).to.eql(undefined);

            expect(res.local.device.name).to.be.equal('nev');
            expect(res.local.device.value).to.be.equal(1234);
            expect(res.local.device.quantity).to.be.equal(4);
            expect(res.local.device.out).to.be.equal(0);

            expect(res.local.redir).to.eql(true);
        });
    });

    it('MW should update device values', function () {
        let req = {
            params: {},
            query: {
                deviceName: 'nev',
                deviceValue: 1234,
                deviceQuantity: 4,
            }
        };
        let res = {local: {}};

        res.local.device = {
            name: 'alma',
            value: 1,
            quantity: 1,
            out: 2
        };

        const objRepo = {
            deviceModel: function() {
                this.save = function (call) {
                    call();
                };
                this.findOne = function (params, call) {
                    call(undefined, res.local.device);
                };
            }
        };

        updateDeviceMW(objRepo)(req, res, function () {
            expect(res.local.err).to.eql(undefined);

            expect(res.local.device.name).to.be.equal('nev');
            expect(res.local.device.value).to.be.equal(1234);
            expect(res.local.device.quantity).to.be.equal(4);
            expect(res.local.device.out).to.be.equal(0);

            expect(res.local.redir).to.eql(true);
        });
    });

    it('MW shouldn\'t find device', function () {
        let req = {
            params: {},
            query: {
                deviceName: 'nev',
                deviceValue: 1234,
                deviceQuantity: 4,
            }
        };
        let res = {local: {}};

        const objRepo = {
            deviceModel: function() {
                this.save = function (call) {
                    call();
                };
                this.findOne = function (params, call) {
                    call(undefined, undefined);
                };
            }
        };

        updateDeviceMW(objRepo, function () {
            expect(res.local.err).to.eql('item not found');
        });
    });

    it('Error while finding device', function () {
        let req = {
            params: {},
            query: {
                deviceName: 'nev',
                deviceValue: 1234,
                deviceQuantity: 4,
            }
        };
        let res = {local: {}};

        const objRepo = {
            deviceModel: function() {
                this.save = function (call) {
                    call();
                };
                this.findOne = function (params, call) {
                    call('kredenc', undefined);
                };
            }
        };

        updateDeviceMW(objRepo, function () {
            expect(res.local.err).to.eql('error in findOne');
        });
    });
});