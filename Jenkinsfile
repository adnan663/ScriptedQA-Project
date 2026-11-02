
pipeline {
    agent any

    environment {
        CI = 'true'
        HEADLESS = 'true'
    }

    options {
        timestamps()
    }

    stages {

        stage('Check Node and NPM') {
            steps {
                bat 'node --version'
                bat 'npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('tests') {
                    bat 'npm ci'
                }
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                dir('tests') {
                    bat 'npx playwright install chromium'
                }
            }
        }

        stage('Run Playwright Tests') {
            steps {
                dir('tests') {
                    bat 'npm test'
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'tests/reports/**, tests/test-results/**',
                             allowEmptyArchive: true
        }
    }
}
