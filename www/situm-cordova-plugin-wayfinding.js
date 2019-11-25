var exec = require('cordova/exec');

/** 
 * @namespace SitumWayfindingPlugin
 */

// Empty constructor
function SitumWayfindingPlugin() {}


/**
 * Loads SitumWayfinding in the specified div.
 *
 * @param {string} map_div - Name of the div where SitumWayfinding would be loaded
 * @param {string} settings - Settings used by the native library to configure its behaviour
 * @param {function} success - Success callback function
 * @param {function} error -  Error callback function
 * @return {Object} A map object
 *
 * @example
 *
 *     load(map_div,
 function(success) {},function(error) {});
 */
SitumWayfindingPlugin.prototype.load = function (map_div, settings, success, error) {
  // Create a Google Maps native view under the map_canvas div.
  var map = plugin.google.maps.Map.getMap(map_div);
  map.on(plugin.google.maps.event.MAP_READY, function(latLng) {
        exec(success,  //success callback
        error,                //error callback
        "SitumWayfindingPlugin",           //class name
        "load",      //action name
        [settings]);        //args
  });
  return map;
};

/**
 * Unloads SitumWayfinding view.
 *
 * @param {Object} map - Object to unload
 * @param {function} success - Success callback function 
 * @param {function} error -  Error callback function 
 *
 *
 * @example
 *
 *     unload(map, function(success) {},function(error) {});
 */
SitumWayfindingPlugin.prototype.unload = function (map, success, error) {
  exec(success, 
        error,               
        "SitumWayfindingPlugin",           
        "stopSitumProcesses",      
        []);   
  map.remove();
  exec(success, 
        error,               
        "SitumWayfindingPlugin",           
        "unload",      
        []);     
};

// Installation constructor that binds SitumWayfindingPlugin to window
SitumWayfindingPlugin.install = function() {
  if (!plugin.situm.wayfinding) {
    plugin.situm.wayfinding = {};
  }
  plugin.situm.wayfinding.situmWayfindingPlugin = new SitumWayfindingPlugin();
  return plugin.situm.wayfinding.situmWayfindingPlugin;
};

cordova.addConstructor(SitumWayfindingPlugin.install);
