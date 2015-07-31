/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

/*
The BLE - iBeacon Node.js sample application distributed within Intel® XDK IoT Edition under the IoT with Node.js Projects project creation option showcases how to advertise it's presence as a BLE ibeacon via Bluetooth Low Energy (BLE) communication.

MRAA - Low Level Skeleton Library for Communication on GNU/Linux platforms
Library in C/C++ to interface with Galileo & other Intel platforms, in a structured and sane API with port nanmes/numbering that match boards & with bindings to javascript & python.
Steps for installing/updating MRAA & UPM Library on Intel IoT Platforms with IoTDevKit Linux* image
Using a ssh client: 
1. echo "src maa-upm http://iotdk.intel.com/repos/1.1/intelgalactic" > /etc/opkg/intel-iotdk.conf
2. opkg update
3. opkg upgrade
OR
In Intel XDK IoT Edition under the Develop Tab (for Internet of Things Embedded Application)
Develop Tab
1. Connect to board via the IoT Device Drop down (Add Manual Connection or pick device in list)
2. Press the "Settings" button
3. Click the "Update libraries on board" option

Review README.md file for more information about enabling bluetooth and completing the desired configurations.


*/

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