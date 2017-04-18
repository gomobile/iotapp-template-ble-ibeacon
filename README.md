Intel® XDK IoT Node.js\* BLE iBeacon App
========================================

See [LICENSE.md](LICENSE.md) for license terms and conditions.

This sample application is distributed as part of the
[Intel® XDK](http://xdk.intel.com). It can also be downloaded
or cloned directly from its git repo on the
[public Intel XDK GitHub\* site](https://github.com/gomobile).

For help getting started developing applications with the
Intel XDK, please start with
[the Intel XDK documentation](https://software.intel.com/en-us/xdk/docs).

See also, the
[mraa library documentation](https://iotdk.intel.com/docs/master/mraa/index.html)
for details regarding supported boards and the mraa library API and the
[upm library documentation](https://iotdk.intel.com/docs/master/upm/) for
information regarding the upm sensor and actuator library APIs.

App Overview
------------

A simple nodeJS project that uses the bleno node module so your IoT device
can advertise its presence as a beacon over Bluetooth Low Energy (BLE).

### Intel(R) Edison

You must _enable_ bluetooth and _disable_ the bluetooth daemon on your device.

### Intel(R) Galileo

This IoT device requires use of a compatible BLE product, such as the
[Grove - BLE](http://www.seeedstudio.com/depot/Grove-BLE-p-1929.html) and also
requires that you _disable_ the bluetooth daemon.


###Intel(R) Edison & Intel(R) Galileo

####First time - Enabling BLE

Within a SSH or Serial Terminal connection, type the following commands,
```
rfkill unblock bluetooth
hciconfig hci0 up

vi /etc/opkg/base-feeds.conf (insert only following lines)
src/gz all http://repo.opkg.net/edison/repo/all
src/gz edison http://repo.opkg.net/edison/repo/edison
src/gz core2-32 http://repo.opkg.net/edison/repo/core2-32
```
*For more information on the vi editor, visit* http://www.cs.colostate.edu/helpdocs/vi.html

```
opkg update
opkg install bluez5-dev
```

**Note:** If bluez fails to install this version, still proceed with remainding steps.

#### Prerequisite for Bleno - node package to work successfully

**Note:** The following steps will need to be executed every time the board is restarted.
Within a SSH or Serial Terminal connection, type the following commands,
```
rfkill unblock bluetooth
killall bluetoothd (or, more permanently) systemctl disable bluetooth
hciconfig hci0 up
```

You should now be able to use BLE in your project.

#### (Intel XDK IoT Edition) Install node modules

Within the "manage your xdk daemon and IoT device" menu, check the following boxes
* Clean '/node_modules' before building
* Run npm install directly on IoT Device (requires internet connection on device)

You can installed the required node modules for this project which are
found in the package.json file by pressing the Build/Install button.

#### (Intel XDK IoT Edition) Upload & Run project

After installing the neccessary node modules, press the upload and run
buttons to execute your project on your board.


#### Getting Started with Bleno NodeJS Plug-in

##### Design Considerations

The key information needed for identifying and configuring your development
board as a BLE iBeacon:

```javascript
//iBeacon info
var uuid  = 'e2c56db5dffb48d2b060d0f5a71096e0';
var major = 0;
var minor = 0;
var measuredPower = -59;
```

The **first operation** is to set up an eventlistener for the "stateChange"
event. Within this function block, it is recommended to startAdvertising your
service only when the state is in powerOn.

```javascript
bleno.on('stateChange', function(state) {
    console.log('on -> stateChange: ' + state);

    if (state === 'poweredOn') {
        bleno.startAdvertisingIBeacon(
            uuid, major, minor, measuredPower);
    }
    else if (state === 'unsupported') {
        console.log(
            "Please review the README.md for steps to enable the required configurations."
        );
    }
    else {
        bleno.stopAdvertising();
    }
});

```
The **second operation** is to set up an eventlistener for the "advertisingStart" event.
```javascript
bleno.on('advertisingStart', function() {
    console.log('on -> advertisingStart');
});
```

The **third operation** is to set up an eventlistener for the "advertisingStop" event.
```javascript
bleno.on('advertisingStop', function() {
    console.log('on -> advertisingStop');
});
```

#### Testing/Validation

In order to test this application, I recommend downloading the following
mobile application that will allow you to view your nearby development board
(ibeacon) as well as other BLE ibeacon devices:

1. **Locate Beacon** - Finds any nearby beacon with real-time distance estimates
a. [iOS App](https://itunes.apple.com/us/app/locate-for-ibeacon/id738709014?mt=8)
b. [Android App](https://play.google.com/store/apps/details?id=com.radiusnetworks.locate&hl=en)

Important App Files
-------------------

* main.js
* package.json

Important Project Files
-----------------------

* README.md
* LICENSE.md
* \<project-name\>.xdk

Tested IoT Node.js Platforms
----------------------------

* [Intel® Galileo Board](http://intel.com/galileo)
* [Intel® Edison Development Platform](http://intel.com/edison)

This sample can run on other IoT [Node.js](http://nodejs.org) development
platforms, that include the appropriate sensor hardware, but may require
changes to the I/O initialization and configuration code in order to work on
those other platforms.
