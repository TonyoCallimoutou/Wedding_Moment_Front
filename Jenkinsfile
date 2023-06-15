pipeline {
  agent any
  stages {
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
  }
}
