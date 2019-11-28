/**
* NODE iOS & NODE Android
*
* The pipeline first installs Cordova CLI and creates a blank project.
* Next stage adds platform (Android/iOS) and the plugin.
* After that, the project is built for the selected platform (Android/iOS)
* Final stage removes both the test project and npm's installation folder,
* this stage will be always executed even if any previous step fails.
*
* NODE vm1-docker
*
* This phase generates the JSDoc, archives it as a Jenkins artifact and cleans the folder used
*
*/

// This line sets the amount of artifacts that can be stored and the number
// of days to be kept. This helps keeping CI from running out of space.
properties([buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '10', numToKeepStr: '5')), pipelineTriggers([])])

// NODE iOS
node('ios') {

    stage('Checkout SCM') {
        checkout scm
    }

    try {

        stage('Create test project') {
          sh 'npm install cordova'
          sh './node_modules/cordova/bin/cordova create test-project'
        }

        stage('Add iOS and plugin'){
          sh 'cd test-project && ./../node_modules/cordova/bin/cordova platform add ios@5.0.1'
          sh 'cd test-project && ./../node_modules/cordova/bin/cordova plugin add situm-cordova-plugin-wayfinding'
        }

        stage ('Build iOS platform') {
            sh 'cd test-project/ && ./../node_modules/cordova/bin/cordova build ios'
        }

        // [27/11/19] TODO: Add test phase

    } finally {

        stage('Clean repo') {
            sh "rm -rf test-project"
            sh 'rm -rf node_modules'
        }
    }
}

// NODE Android
node('vm1-docker') {

    stage('Checkout SCM') {
        checkout scm
    }

    try {

        stage ('Create test project') {
          def kubectl = docker.image('docker-android-cordova')
          kubectl.pull()
          kubectl.inside() {
            //sh 'npm install cordova'
            sh './node_modules/cordova/bin/cordova create test-project'
          }
        }

        stage('Add Android and plugin'){
          def kubectl = docker.image('docker-android-cordova')
          kubectl.inside() {
            sh 'cd test-project && cordova platform add android@8.0.0'
            sh 'cd test-project && cordova plugin add situm-cordova-plugin-wayfinding'
          }
        }

        stage('Build Android') {
          def kubectl = docker.image('docker-android-cordova')
          kubectl.inside() {
            sh 'cd test-project/ && cordova build android'
          }
        }

        // [27/11/19] TODO: Add test phase

    } finally {

        stage('Clean repo') {
          def kubectl = docker.image('node:11.12-slim')
          kubectl.inside() {
            sh "rm -rf test-project"
            //sh 'rm -rf node_modules'
          }
        }
    }
}

// NODE vm1-docker
node('vm1-docker') {

    stage('Checkout SCM') {
        checkout scm
    }

    try {

        stage('Generate JSDoc') {
            def kubectl = docker.image('node:11.12-slim')
            kubectl.pull()
            kubectl.inside() {
                sh "npm run jsdoc"
            }
        }

        stage('Archive artifacts'){
            def kubectl = docker.image('node:11.12-slim')
            kubectl.inside("-u 0 --") {
                sh "apt-get update && apt-get --assume-yes install zip"
                sh "zip -r JSDoc ./docs/JSDoc/*"
                archiveArtifacts "JSDoc.zip"
            }
        }

    } finally {

        stage('Clean repo'){
            def kubectl = docker.image('node:11.12-slim')
            kubectl.inside("-u 0") {
                sh "rm -rf docs/"
            }
        }
    }
}
