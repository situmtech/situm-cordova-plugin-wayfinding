package es.situm.wayfinding;

import android.support.annotation.Nullable;
import android.support.v4.app.FragmentActivity;
import android.util.Log;

import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapView;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaActivity;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginEntry;
import org.apache.cordova.PluginManager;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Collection;

import plugin.google.maps.PluginMap;

/**
 * Situm Wayfinding Cordova Plugin.
 */
public class SitumWayfindingPlugin extends CordovaPlugin {

  private static final String TAG = SitumWayfindingPlugin.class.getSimpleName();
  public PluginManager pluginManager;
  public FragmentActivity activity;
  private ModuleCreator moduleCreator;

  @Override
  public void initialize(CordovaInterface cordova, CordovaWebView webView) {
    super.initialize(cordova, webView);
    pluginManager = webView.getPluginManager();
    activity = (FragmentActivity) cordova.getActivity();
  }

  @Override
  public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    Log.d(TAG, "Walking in here" + action);
    boolean parent_exec = super.execute(action, args, callbackContext);
    if (action.equals("load")) {
      Log.d(TAG, "Keep walking");
      String user = this.preferences.getString("SITUM_USER", "noUserFound");
      String apiKey = this.preferences.getString("SITUM_API_KEY", "noApiKeyFound");
      JSONObject librarySettings = args.getJSONObject(0);
      librarySettings.put("SITUM_USER", user);
      librarySettings.put("SITUM_API_KEY", apiKey);
      Log.d(TAG, "Keep walking: " + user + " towards: " + apiKey);
      this.loadSitumModule(librarySettings, callbackContext);
      return true;
    } else if (action.equals("unload")) {
      if(moduleCreator != null) {
        moduleCreator.unload();
      } else {
        Log.e(TAG, "Module was not properly initialized before calling unload.");
      }
    }
    return parent_exec;
  }

  private void loadSitumModule(JSONObject librarySettings, CallbackContext callbackContext) {
    activity.runOnUiThread(doLoadSitumModule(librarySettings, callbackContext));
  }

  private Runnable doLoadSitumModule(JSONObject librarySettings, CallbackContext callbackContext) {
    return () -> {
      PluginMap pluginMap = findPluginMap();
      if (pluginMap == null) {
        String errorMessage = "Map is null. Missing 'div#situm_map_canvas' in your HTML.";
        Log.e(TAG, errorMessage);
        callbackContext.error(errorMessage);
        return;
      }
      MapView mapView = (MapView) pluginMap.getView();
      moduleCreator = ModuleCreator.create(activity, mapView, librarySettings, callbackContext);
    };
  }

  private PluginMap findPluginMap() {
    Collection<PluginEntry> collection = pluginManager.getPluginEntries();
    for (PluginEntry entry : collection) {
      if ("plugin.google.maps.PluginMap".equals(entry.pluginClass) && entry.plugin != null) {
        return (PluginMap) entry.plugin;
      }
    }
    return null;
  }
}
