node('ios') {
    stage('Checkout SCM') {
        checkout scm
    }

    stage('Clean iOS'){
        sh "cd src/ios && xcodebuild clean -workspace SitumCordovaPlugin.xcworkspace -scheme CordovaLib"
    }

    try {
        stage ('Build iOS') {
            sh "cd src/ios && xcodebuild build -workspace SitumCordovaPlugin.xcworkspace -scheme CordovaLib -destination 'platform=iOS Simulator,name=iPhone 7,OS=11.2'"
        }
    } finally {
        stage('Clean repo') {
            sh "cd src/ios && xcodebuild clean -workspace SitumCordovaPlugin.xcworkspace -scheme CordovaLib && rm -rf build/"
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
