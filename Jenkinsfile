pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.64.1-noble'
    }
  }

  environment {
    CI = 'true'
    HEADLESS = 'true'
  }

  options {
    timestamps()
  }

  stages {
    stage('Install dependencies') {
      steps {
        dir('tests') {
          sh 'npm ci'
        }
      }
    }

    stage('Run Playwright tests') {
      steps {
        dir('tests') {
          sh 'npm test'
        }
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'tests/reports/**, tests/test-results/**', allowEmptyArchive: true
    }
  }
}
