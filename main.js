/*
 * Use the 'bleno' node module to advertise your IoT device's presence as a
 * beacon, via Bluetooth Low Energy (BLE) communication.
 *
 * Supported Intel IoT development boards are identified in the code.
 *
 * See LICENSE.md for license terms and conditions.
 *
 * https://software.intel.com/en-us/xdk/docs/using-templates-nodejs-iot
 */

/* spec jslint and jshint lines for desired JavaScript linting */
/* see http://www.jslint.com/help.html and http://jshint.com/docs */
/* jslint node:true */
/* jshint unused:true */

"use strict" ;


var bleno = require('bleno');

console.log('iBeacon NodeJS template');

//iBeacon info
var uuid  = 'e2c56db5dffb48d2b060d0f5a71096e0';
var major = 0;
var minor = 0;
var measuredPower = -59;

bleno.on('stateChange', function(state) {
    console.log('on -> stateChange: ' + state);

    if (state === 'poweredOn') {
        bleno.startAdvertisingIBeacon(
            uuid, major, minor, measuredPower);
    }
    else if (state === 'unsupported') {
        console.log("Please review the README.md for steps to enable the required configurations.");
    }
    else {
        bleno.stopAdvertising();
    }
});

bleno.on('advertisingStart', function() {
    console.log('on -> advertisingStart');
});

bleno.on('advertisingStop', function() {
    console.log('on -> advertisingStop');
});