pipeline {
  agent any
  stages {
    stage('Git pull') {
      steps {
        script {
          sh 'docker exec -w /app front-prod git pull'
        }
      }
    }
    stage('npm install') {
      steps {
        script {
          sh 'docker exec -w /app front-prod npm install'
        }
      }
    }
    stage('npm build') {
      steps {
        script {
          sh 'docker exec -w /app front-prod npm run build-prod'
        }
      }
    }
  }
}
