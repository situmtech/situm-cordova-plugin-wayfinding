# Cordova SitumWayfinding plugin for Android and iOS

## Description

Situm Wayfinding Module has been designed to create indoor location applications in the simplest way. It has been built in the top of the Situm SDK. This plugin allows you to use SitumWayfinding in your Cordova plugins.

This plugin uses [GoogleMaps Cordova Plugin](https://github.com/mapsplugin/cordova-plugin-googlemaps)

## Installing pre-requisites

### Configure cordova:

* https://cordova.apache.org/docs/en/latest/guide/cli/index.html#installing-the-cordova-cli

### Cordova requirements:

* [Android](https://cordova.apache.org/docs/en/latest/guide/platforms/android/#installing-the-requirements)
* [iOS](https://cordova.apache.org/docs/en/latest/guide/platforms/android/#installing-the-requirements)
* [Cocoapods](https://cocoapods.org/) (Only if you need your application to run in iOS devices)

## Plugin installation
    
Use Cordova CLI utility to install it

    $> cordova plugin add cordova-plugin-situmwayfinding

## Using the Plugin

### System permission

For your iOS app you have to provide the following permissions

  - **NSLocationAlwaysUsageDescription**
    A message that tells the user why the app is requesting access to the user’s location information while the app is running in the foreground.

  - **NSLocationAlwaysUsageDescription**
    A message that tells the user why the app is requesting access to the user's location at all times.

  - **NSBluetoothPeripheralUsageDescription**
    A message that tells the user why the app is requesting the ability to connect to Bluetooth peripherals.

  - **NSBluetoothAlwaysUsageDescription** (Only if you are targeting iOS13.0 or superior)
    A message that tells the user why the app needs access to Bluetooth.


### API key (Android and iOS platforms)

  You can specify your API keys in `config.xml` file.

  ```xml
    <preference name="GOOGLE_MAPS_IOS_API_KEY" value="YOUR_GOOGLE_MAPS_IOS_KEY"/>
    <preference name="SITUM_USER" value="YOUR_SITUM_USER"/>
    <preference name="SITUM_API_KEY" value="YOUR_SITUM_APIKEY"/>
    <preference name="SITUM_BUILDING_ID" value="YOUR_BUILDING_ID"/>
  ```

### Accessing plugin object

When the device ready event is fired, global cordova variable is injected in namespace. Plugins are available in this variable: plugin.situm.wayfinding.situmWayfindingPlugin. The Situm Cordova Plugin is autowired within this object.

So, all methods are called in the same way, e.g. 'load':

```javascript
  plugin.situm.wayfinding.situmWayfindingPlugin.load(map_div, function(success) {},function(error) {});
```

### Methods

#### - load

Load SitumWayfinding in the specified div. 

```javascript
  load("div_id_where_to_place_plugin", "success_callback", "error_callback");
```

This method returns and plugin object.

#### - unload

Unload SitumWayfinding plugin_object.

```javascript
  unload("plugin_object", "success_callback", "error_callback")
```

## Generating JSDoc

The JSDoc is avaible in both, in [Situm Developers Page](http://developers.situm.es/sdk_documentation/wayfinding/jsdoc/latest/SitumWayfindingPlugin.html). and into this project docs folder. However if you want to regenerate JSDoc by yourself, you need to install *Toast UI JSDoc template* via npm. To do it, in the plugin root:

```
npm install
npm i -D tui-jsdoc-template
``` 

And then generate the documentation:
```
npm run jsdoc
``` 

## License

SitumWayfinding is available under the MIT license. See the LICENSE file for more info.