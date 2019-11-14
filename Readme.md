# Cordova SitumWayfinding plugin for Android and iOS

## Description

Situm Wayfinding Module has been designed to create indoor location applications in the simplest way. It has been built in the top of the Situm SDK and its functionalities has been widely tested. This plugin allows you to use SitumWayfinding in your Cordova plugins

This plugin uses [GoogleMaps Cordova Plugin](https://github.com/mapsplugin/cordova-plugin-googlemaps)

## Installation
First you need to install GoogleMaps Cordova Plugin

    $> cordova plugin add cordova-plugin-googlemaps
    
Afterwards, install SitumWayfinding Cordova Plugin

    $> cordova plugin add cordova-plugin-situmwayfinding


## System permission

For your iOS app you have to provide the following permissions

  - **LOCATION_WHEN_IN_USE_DESCRIPTION**
    A message that tells the user why the app is requesting access to the user’s location information while the app is running in the foreground.

  - **LOCATION_ALWAYS_USAGE_DESCRIPTION**
    A message that tells the user why the app is requesting access to the user's location at all times.

  - **NSBluetoothPeripheralUsageDescription**
    A message that tells the user why the app is requesting the ability to connect to Bluetooth peripherals.


### API key (Android and iOS platforms)

  You can specify your API keys in `config.xml` file.

  ```xml
    <preference name="GOOGLE_MAPS_IOS_API_KEY" value="YOUR_GOOGLE_MAPS_IOS_KEY"/>
    <preference name="SITUM_USER" value="YOUR_SITUM_USER"/>
    <preference name="SITUM_API_KEY" value="YOUR_SITUM_APIKEY"/>
    <preference name="SITUM_BUILDING_ID" value="YOUR_BUILDING_ID"/>
  ```

## License

SitumWayfinding is available under the MIT license. See the LICENSE file for more info.