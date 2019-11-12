/********* cordova-plugin-wayfinding.m Cordova Plugin Implementation *******/

#import <Cordova/CDV.h>
@import SitumWayfinding;

@interface SitumWayfindingPlugin : CDVPlugin
- (void)unload:(CDVInvokedUrlCommand*)command;
- (void)load:(CDVInvokedUrlCommand*)command;
@end
