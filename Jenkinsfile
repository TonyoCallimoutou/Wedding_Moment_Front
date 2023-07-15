pipeline {
  agent any
  stages {
    stage('restart container') {
      steps {
        script {
          sh 'docker restart front-dev'
        }
      }
    }
    stage('Git pull') {
      steps {
        script {
          sh 'docker exec -w /app front-dev git pull'
        }
      }
    }
    stage('npm install') {
      steps {
        script {
          sh 'docker exec -w /app front-dev npm install'
        }
      }
    }
    stage('npm build') {
      steps {
        script {
          sh 'docker exec -w /app front-dev npm run build-prod'
        }
      }
    }
    stage('stop container dev') {
      steps {
        script {
          sh 'docker stop front-dev'
        }
      }
    }
  }
}
