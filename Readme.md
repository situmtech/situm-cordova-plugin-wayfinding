# Cordova SitumWayfinding plugin for Android and iOS

> [!IMPORTANT]  
> This guide refers to the old version of the Wayfinding module, which is **no longer maintained**. We strongly recommend adopting [MapView](https://developers.situm.com/sdk_documentation/cordova/jsdoc/latest/mapview), the new visual component available at [@situm/cordova](https://github.com/situmtech/cordova) for both Cordova and Capacitor.
To stay up to date, checkout the [Cordova SDK Changelog](https://situm.com/docs/cordova-sdk-changelog/) and the [example app](https://github.com/situmtech/cordova/tree/master/example) at the public repository.

## Description

Situm Wayfinding Module has been designed to create indoor location applications in the simplest way. It has been built in the top of the Situm SDK. This plugin allows you to use SitumWayfinding in your Cordova plugins.

This plugin uses [GoogleMaps Cordova Plugin](https://github.com/mapsplugin/cordova-plugin-googlemaps)

## Submitting Contributions

You will need to sign a Contributor License Agreement (CLA) before making a submission. 
[Learn more here.](https://situm.com/contributions/)

## Installing pre-requisites

### Configure cordova:

* [Install Cordova CLI](https://cordova.apache.org/docs/en/latest/guide/cli/index.html#installing-the-cordova-cli)
* [Cordova CLI 9.0.0](https://cordova.apache.org/announcements/2019/03/22/cordova-cli-release-9.0.0.html) is recommended
* [Cordova Lib 9.0.0](https://cordova.apache.org/announcements/2019/03/18/cordova-lib-release-9.0.0.html) is recommended

### Cordova requirements:

* [Android](https://cordova.apache.org/docs/en/latest/guide/platforms/android/#installing-the-requirements)
* [Cordova Android 8.0.0](https://cordova.apache.org/announcements/2019/02/16/cordova-android-release-8.0.0.html) or superior is recommended
* [iOS](https://cordova.apache.org/docs/en/latest/guide/platforms/android/#installing-the-requirements)
* [Cordova iOS 5.0.0](https://cordova.apache.org/announcements/2019/02/09/cordova-ios-release-5.0.0.html) or superior is recommended
* [Cocoapods](https://cocoapods.org/) (Only if you need your application to run in iOS devices)


## Plugin installation

Use Cordova CLI utility to install it in your cordova app:

    $> cordova plugin add situm-cordova-plugin-wayfinding

## Using the Plugin

### System permissions

For your Android app, the following permissions will be requested to the user:

  - **ACCESS_COARSE_LOCATION**: Used to provide the positioning system
  - **ACCESS_FINE_LOCATION**: Used to provide the positioning system
  - **WRITE_EXTERNAL_STORAGE**: Used to store all the info required by the module

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
    <preference name="GOOGLE_MAPS_ANDROID_API_KEY" value="YOUR_GOOGLE_MAPS_ANDROID_KEY"/>
    <preference name="GOOGLE_MAPS_IOS_API_KEY" value="YOUR_GOOGLE_MAPS_IOS_KEY"/>
    <preference name="SITUM_USER" value="YOUR_SITUM_USER"/>
    <preference name="SITUM_API_KEY" value="YOUR_SITUM_APIKEY"/>
    <preference name="SITUM_BUILDING_ID" value="YOUR_BUILDING_ID"/>
  ```

### Accessing plugin object

When the device ready event is fired, global cordova variable is injected in namespace. Plugins are available in this variable: plugin.situm.wayfinding.situmWayfindingPlugin. The Situm Cordova Plugin is autowired within this object.

So, all methods are called in the same way, e.g. 'load':

```javascript
  plugin.situm.wayfinding.situmWayfindingPlugin.load(map_div, settings, function(success) {},function(error) {});
```

### Methods

#### - load

Load SitumWayfinding in the specified div. For more info about the settings object, you can [visit the documentation](https://developers.situm.es/sdk_documentation/wayfinding/javadoc/es/situm/wayfinding/LibrarySettings.html).

```javascript
  let librarySettings = {
          'dashboardUrl': 'https://dashboard.situm.es',
          'hasSearchView': true,
          'searchViewPlaceholder': 'Cordova Wayfinding',
          'useDashboardTheme': false
        };

  load("div_id_where_to_place_plugin", "librarySettings", "success_callback", "error_callback");
```

This method returns a plugin object.

** IMPORTANT NOTE** The settings parameter, as the time of writing, is only used by the Android platform. It does not create problems if they are used for the iOS platform, they will be silently ignored.

#### - unload

Unload SitumWayfinding plugin_object.

```javascript
  unload("plugin_object", "success_callback", "error_callback")
```

## Limitations

* Using the "Go back" button in iOS will block the module for the user. It will be fixed in coming releases.
* The methods load and unload should be called in that order and only once. Multiple calls to the same method without calling the other first will result in unexpected failure.

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
