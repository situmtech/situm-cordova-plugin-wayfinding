/********* cordova-plugin-wayfinding.m Cordova Plugin Implementation *******/

#import <Cordova/CDV.h>
#import "PluginMap.h"
@import SitumWayfindingPod;

@interface SitumWayfindingPlugin : CDVPlugin {
  // Member variables go here.
}

- (void)load:(CDVInvokedUrlCommand*)command;
@end

@implementation SitumWayfindingPlugin

-(PluginMapViewController *)getMapViewController:(UIView *)view{
    for (UIView *view in self.viewController.view.subviews){
        if ([view isKindOfClass:[MyPluginLayer class]]){
            MyPluginLayer *pluginLayer =(MyPluginLayer *)view;
            NSDictionary *dict= pluginLayer.pluginScrollView.mapCtrls;
            NSString *firstKey =[[dict allKeys] firstObject];
            PluginMapViewController *firstPluginMVC=(PluginMapViewController *)dict[firstKey];
            return firstPluginMVC;
        }
    }
    return nil;
}

-(UIView *)replaceMapWithContainerView:(PluginMapViewController *)mapViewController{
    GMSMapView * map = mapViewController.map;
    UIView *view = [[UIView alloc] initWithFrame:map.frame];
    [mapViewController setView:view];
    return view;
}

-(NSMutableDictionary *)loadPreferences{
    return ((CDVViewController *)self.viewController).settings;
}

- (void)load:(CDVInvokedUrlCommand*)command
{
    PluginMapViewController * mapVC = [self getMapViewController:self.viewController.view];
    GMSMapView *googleMapView = (GMSMapView *)mapVC.view;
    UIView * containerView=[self replaceMapWithContainerView:mapVC];
    containerView.backgroundColor = [UIColor redColor];
    //TODO check if needed
//    CDVLocation *locationPlugin = [[CDVLocation alloc] init];
//    [locationPlugin pluginInitialize];
//    [locationPlugin isLocationServicesEnabled];
    
    //SitumWayfinding
    NSMutableDictionary *preferences = [self loadPreferences];
    Credentials *credentials = [[Credentials alloc] initWithUser:preferences[@"situm_user"] apiKey:preferences[@"situm_api_key"] googleMapsApiKey:preferences[@"google_maps_ios_api_key"]];
    [self.viewController addChildViewController:mapVC];
    [mapVC didMoveToParentViewController:self.viewController];
    SitumMapsLibrary *library = [[SitumMapsLibrary alloc] initWithContainedBy:containerView controlledBy:mapVC];
    [library setCredentials:credentials];
    NSError *error = [[NSError alloc] init];
    [library loadForCordovaWithBuildingWithId:preferences[@"situm_building_id"] googleMapsMap:googleMapView error:&error];
    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

@end
