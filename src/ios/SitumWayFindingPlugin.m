/********* cordova-plugin-wayfinding.m Cordova Plugin Implementation *******/

#import "SitumWayfindingPlugin.h"
#import "PluginMap.h"
@import SitumWayfinding;

@interface SitumWayfindingPlugin ()
@property (nonatomic) UIView* containerView;
@property (nonatomic) SitumMapsLibrary *library;
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
    self.containerView=[self replaceMapWithContainerView:mapVC];
    self.containerView.backgroundColor = [UIColor redColor];
    
    //SitumWayfinding
    NSMutableDictionary *preferences = [self loadPreferences];
    Credentials *credentials = [[Credentials alloc] initWithUser:preferences[@"situm_user"] apiKey:preferences[@"situm_api_key"] googleMapsApiKey:preferences[@"google_maps_ios_api_key"]];
    [self.viewController addChildViewController:mapVC];
    [mapVC didMoveToParentViewController:self.viewController];
    self.library = [[SitumMapsLibrary alloc] initWithContainedBy:self.containerView controlledBy:mapVC];
    [self.library setCredentials:credentials];
    NSError *error = [[NSError alloc] init];
    [self.library loadWithBuildingWithId:preferences[@"situm_building_id"] googleMapsMap:googleMapView error:&error];
    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void)stopSitumProcesses:(CDVInvokedUrlCommand*)command{
    [self.library stopPositioning];
    [self.library stopNavigation];
}

- (void)unload:(CDVInvokedUrlCommand*)command
{
    [self.containerView removeFromSuperview];
    self.containerView=nil;
}


@end
