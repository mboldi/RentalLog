const assert = require('assert');
const expect = require('chai').expect;

const updateDeviceMW = require('../middleware/device/updateDevice');

describe('Update device test', function () {
    it('There should not be enough values', function (done) {
        const objRepo = {
            deviceModel: function() {}
        };

        let req = {query: {}};
        let res = {local: {}};

        updateDeviceMW(objRepo)(req, res, function () {
            expect(res.local.err).to.equal('not enough values');
            done();
        });
    });

    it('MW should create device values', function (done) {
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
            done();
        });
    });

    it('MW should update device values', function (done) {
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
            done();
        });
    });

    it('MW shouldn\'t find device', function (done) {
        let req = {
            params: { id: "eznemisid"},
            query: {
                deviceName: 'nev',
                deviceValue: 1234,
                deviceQuantity: 4,
            }
        };
        let res = {local: {}};

        class fakeDeviceModel {
            static save(call) {
                call();
            }

            static findOne(params, call) {
                call(undefined, undefined);
            }
        }

        const objRepo = {
            deviceModel: fakeDeviceModel
        };

        updateDeviceMW(objRepo)(req, res, function () {
            expect(res.local.err).to.equal('item not found');
            done();
        });
    });

    it('Error while finding device', function (done) {
        let req = {
            params: {id: 'ezsemid'},
            query: {
                deviceName: 'nev',
                deviceValue: 1234,
                deviceQuantity: 4,
            }
        };
        let res = {local: {}};


        class fakeDeviceModel {
            static save(call) {
                call();
            }

            static findOne(params, call) {
                call('kredenc', undefined);
            }
        }

        const objRepo = {
            deviceModel: fakeDeviceModel
        };

        updateDeviceMW(objRepo)(req, res, function () {
            expect(res.local.err).to.equal('error in findOne');

            done();
        });
    });
});