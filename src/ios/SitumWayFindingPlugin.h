/********* cordova-plugin-wayfinding.m Cordova Plugin Implementation *******/

#import <Cordova/CDV.h>
@import SitumWayfinding;

@interface SitumWayfindingPlugin : CDVPlugin
- (void)load:(CDVInvokedUrlCommand*)command;
- (void)stopSitumProcesses:(CDVInvokedUrlCommand*)command;
- (void)unload:(CDVInvokedUrlCommand*)command;
@end
