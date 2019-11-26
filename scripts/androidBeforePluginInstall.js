/**
* This script finds the gradle configuration in the cordova project and adds
* the "situm-extras.gradle" and "situm-repos.gradle" to allow the
* Android Wayfinding aar to be download.
*
* It also modifies the Cordova main activity so it extends from
* AppCompatActivity instead of Activity.
*/

const path = require('path');
const fs = require('fs');
const util = require('util');

function makeReplacementsFromJson(ctx) {
    // Read json file with replacements spec.
    // Apply replacements to given files.
    let replacements = require('./cordova-lib/replacements.json');
    for (var affectedFile in replacements) {
        let filePath = path.join(ctx.opts.projectRoot, affectedFile);
        let fileReplacements = replacements[affectedFile];
        console.info('Affected file: ' + filePath);
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) return console.log(err);
            var result = data;
            for (var needle in fileReplacements) {
                let replacement = fileReplacements[needle];
                if (needle === 'EOF') {
                    result = result.replace(replacement, ''); // First delete if already present.
                    result = result + replacement;
                } else {
                    result = result.replace(needle, replacement);
                }
            }
            fs.writeFile(filePath, result, 'utf8', function (err) {
                if (err) return console.log(err);
            });
        });
    }
}

function copyFileToTargets(file, targets, ctx) {
    for (var index in targets) {
        let target = path.join(ctx.opts.projectRoot, targets[index]);
        fs.copyFileSync(file, target);
    }
}

module.exports = function (ctx) {
    // Make sure android platform is part of build
    if (!ctx.opts.cordova.platforms.includes('android')) {
        console.error('ERROR: platform android not available. Use cordova platform add android before adding this plugin');
        return;
    }

    console.info('Will now modify CordobaLib!!!');
    makeReplacementsFromJson(ctx);

    console.info('Added situm-extras.gradle with required dependencies.');
    let gradleExtras = path.join(__dirname, 'cordova-lib/situm-extras.gradle');
    let targets = ['platforms/android/CordovaLib/situm-extras.gradle', 'platforms/android/app/situm-extras.gradle'];
    copyFileToTargets(gradleExtras, targets, ctx);
    console.info('Added situm-repos.gradle with required repositories.');
    let gradleRepos = path.join(__dirname, 'cordova-lib/situm-repos.gradle');
    targets = ['platforms/android/situm-repos.gradle'];
    copyFileToTargets(gradleRepos, targets, ctx);
};
