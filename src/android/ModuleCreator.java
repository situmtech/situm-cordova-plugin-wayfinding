package es.situm.wayfinding;

import android.support.v4.app.FragmentActivity;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.google.android.gms.maps.MapView;

import org.apache.cordova.CallbackContext;
import org.json.JSONObject;
import org.json.JSONException;

import es.situm.wayfinding.LibrarySettings;
import es.situm.wayfinding.SitumMapsLibrary;
import es.situm.wayfinding.SitumMapsListener;

/**
 * @author Rodrigo Lago.
 */
public class ModuleCreator implements SitumMapsListener {
  private static final String TAG = ModuleCreator.class.getSimpleName();
  private MapView mapView;
  private FragmentActivity activity;
  private ViewGroup mapViewParent;
  private int index;
  private ViewGroup.LayoutParams params;
  private View rootView;
  private SitumMapsLibrary library;
  private LibrarySettings librarySettings;
  private CallbackContext callbackContext;

  public static ModuleCreator create(FragmentActivity pActivity, MapView pMapView, JSONObject librarySettings,
      CallbackContext callbackContext) {
    // 1) Prepare creator instance, remove old view:
    ModuleCreator creatorInstance = ModuleCreator.prepare(pActivity, pMapView, librarySettings, callbackContext);
    // 2) Create a pretty new view:
    creatorInstance.createNewFashionedView(librarySettings);
    return creatorInstance;
  }

  private static ModuleCreator prepare(FragmentActivity pActivity, MapView pMapView, JSONObject librarySettings,
      CallbackContext callbackContext) {
    ModuleCreator creatorInstance = new ModuleCreator();
    ViewGroup mapViewParent = (ViewGroup) pMapView.getParent();
    creatorInstance.librarySettings = new LibrarySettings(); // TODO: map JSONObject to LibrarySettings!
    creatorInstance.callbackContext = callbackContext;
    creatorInstance.mapView = pMapView;
    creatorInstance.mapViewParent = mapViewParent;
    creatorInstance.index = mapViewParent.indexOfChild(pMapView);
    creatorInstance.params = pMapView.getLayoutParams();
    creatorInstance.activity = pActivity;
    mapViewParent.removeView(pMapView);
    return creatorInstance;
  }

  private View createNewFashionedView(JSONObject librarySettings) {
    LayoutInflater inflater = LayoutInflater.from(activity);
    int layout = activity.getResources().getIdentifier("sitummap_creator_layout", "layout", activity.getPackageName());
    rootView = inflater.inflate(layout, mapViewParent, false);
    rootView.setLayoutParams(params);
    mapViewParent.addView(rootView, index);
    String user = null;
    String apiKey = null;
    Boolean hasSearchView = null;
    Boolean useDashboardTheme = null;
    try {
      user = librarySettings.getString("SITUM_USER");
      apiKey = librarySettings.getString("SITUM_API_KEY");
      hasSearchView = librarySettings.getBoolean("hasSearchView");
      useDashboardTheme = librarySettings.getBoolean("useDashboardTheme");
    } catch (JSONException ex) {
      Log.e(TAG, "An error ocurred reading librarySettings.", ex);
      return rootView;
    }
    this.librarySettings.setGoogleMap(mapView);
    this.librarySettings.setApiKey(user, apiKey);
    this.librarySettings.setHasSearchView(hasSearchView);
    this.librarySettings.setUseDashboardTheme(useDashboardTheme);
    library = new SitumMapsLibrary(es.situm.maps.library.R.id.situm_maps_library_target, activity,
        this.librarySettings);
    library.setSitumMapsListener(this);
    library.load();
    return rootView;
  }

  public void unload() {
    library.unload();
  }

  @Override
  public void onSuccess() {
    callbackContext.success();
    Log.d(TAG, "Succeeded loading SitumMapsLibrary!");
  }

  @Override
  public void onError(int i) {
    String errorMessage = "Error loading SitumMapsLibrary. Error code is " + i;
    callbackContext.error(errorMessage);
    Log.e(TAG, errorMessage);
  }
}
