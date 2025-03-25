pipeline {
    agent any
    options {
        skipStagesAfterUnstable()
        disableRestartFromStage()
    }
    tools {
        nodejs "nodejs"
    }
    stages {
        stage('install') {
            when {
                branch 'main'
            }
            steps {
                
                sh 'npm install'
            }
        }

        stage('dev-main') {
            when {
                branch 'main'
            }
            steps {
                echo 'deploying the software'
                sh '''
                    #!/bin/bash
                    npm run build
                '''
            }
        }
    }
}
