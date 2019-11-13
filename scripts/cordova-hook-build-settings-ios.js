module.exports = function (ctx) {

    var fs = require("fs");
    var path = require("path");
    var xcode = require("xcode");
    var deferral = require('q').defer();

    console.log('Executing hoook');
    /**
     * Recursively search for file with the tiven filter starting on startPath
     */
    function searchRecursiveFromPath(startPath, filter, rec, multiple) {
        if (!fs.existsSync(startPath)) {
            console.log("no dir ", startPath);
            return;
        }

        var files = fs.readdirSync(startPath);
        var resultFiles = []
        for (var i = 0; i < files.length; i++) {
            var filename = path.join(startPath, files[i]);
            var stat = fs.lstatSync(filename);
            if (stat.isDirectory() && rec) {
                fromDir(filename, filter); //recurse
            }

            if (filename.indexOf(filter) >= 0) {
                if (multiple) {
                    resultFiles.push(filename);
                } else {
                    return filename;
                }
            }
        }
        if (multiple) {
            return resultFiles;
        }
    }

    var xcodeProjPath = searchRecursiveFromPath('platforms/ios', '.xcodeproj', false);
    var projectPath = xcodeProjPath + '/project.pbxproj';
    console.log("Found", projectPath);

    var proj = xcode.project(projectPath);
    var mXCBuildConfigurationSections = proj.parseSync().pbxXCBuildConfigurationSection()

    //create the new BuildConfig
    var newBuildConfig = {}
    for(prop in mXCBuildConfigurationSections) {
        var value = mXCBuildConfigurationSections[prop];
        if(!(typeof value === 'string')) {
            //We have to add this only if Configuration has a Product Name
            if (value.buildSettings['PRODUCT_NAME']){
                /*
                * ADD BUILD SETTINGS HERE
                */
                    if (!value.buildSettings['LD_RUNPATH_SEARCH_PATHS']){
                        value.buildSettings['LD_RUNPATH_SEARCH_PATHS'] = '"/usr/lib/swift @executable_path/Frameworks"';
                    }else{
                        value.buildSettings['LD_RUNPATH_SEARCH_PATHS'] = '"/usr/lib/swift ' + value.buildSettings['LD_RUNPATH_SEARCH_PATHS'].substr(1);
                    }
                    //If no value for LIBRARY_SEARCH_PATHS add as array
                    if (!value.buildSettings['LIBRARY_SEARCH_PATHS']){
                        lib_search_paths = new Array();
                        value.buildSettings['LIBRARY_SEARCH_PATHS'] =  lib_search_paths;
                    }
                    
                    //Add new values
                    if (value.buildSettings['LIBRARY_SEARCH_PATHS'] instanceof Array){
                        value.buildSettings['LIBRARY_SEARCH_PATHS'].push('"$(TOOLCHAIN_DIR)/usr/lib/swift/$(PLATFORM_NAME)"');
                        value.buildSettings['LIBRARY_SEARCH_PATHS'].push('"$(TOOLCHAIN_DIR)/usr/lib/swift-5.0/$(PLATFORM_NAME)"');
                    }
                /*
                * END
                */
            }
        }
        newBuildConfig[prop] = value;
    }

    //Change BuildConfigs
    proj.hash.project.objects['XCBuildConfiguration'] = newBuildConfig

    fs.writeFile(proj.filepath, proj.writeSync(), 'utf8', function (err) {
        if (err) {
            deferral.reject(err);
            return;
        }
        console.log("finished writing xcodeproj");
        deferral.resolve();
    });

    return deferral.promise;
};