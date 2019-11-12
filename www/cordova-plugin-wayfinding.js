var exec = require('cordova/exec');

// Empty constructor
function SitumWayfindingPlugin() {}

SitumWayfindingPlugin.prototype.load = function (map_div, success, error) {
  // Create a Google Maps native view under the map_canvas div.
  var map = plugin.google.maps.Map.getMap(map_div);
  map.on(plugin.google.maps.event.MAP_READY, function(latLng) {
        exec(success,  //success callback
        error,                //error callback
        "SitumWayfindingPlugin",           //class name
        "load",      //action name
        []);        //args
  });
  return map;
};

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