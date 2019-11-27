node('ios') {
    stage('Checkout SCM') {
        checkout scm
    }

    try {
        stage('Add iOS platform'){
          sh 'npm install cordova'
          sh './node_modules/cordova/bin/cordova create test-project'
          sh 'cd test-project && ./../node_modules/cordova/bin/cordova platform add ios@5.0.1'
        }

        stage ('Build iOS platform') {
            sh "cd test-project/ && ./../node_modules/cordova/bin/cordova plugin add situm-cordova-plugin-wayfinding"
            sh 'cd test-project/ && ./../node_modules/cordova/bin/cordova build ios'
        }
    } finally {
        stage('Clean repo') {
            sh "rm -rf test-project"
            sh 'rm -rf node_modules'
        }
    }
}

node('androidci') {
    stage('Checkout SCM') {
        checkout scm
    }

    stage('Clean Android'){
        sh "cd src/android && ./gradlew clean"
    }

    try {
        stage('Build Android') {
            sh "cd src/android && ./gradlew app:build"
        }
    } finally {
        stage('Clean repo') {
            sh "cd src/android && ./gradlew clean && rm -rf app/build/"
        }
    }
}

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
            kubectl.inside("-u 0") {
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
