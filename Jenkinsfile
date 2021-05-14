pipeline {
  agent any
    
  tools { nodejs "node" }
    
  stages {
        
    stage('Git') {
      steps {
          checkout scm
      }
    }
     
    stage('Build') {
      steps {
        nodejs "node" {
          sh 'npm install'
          // sh 'npm build'
        }
      }
    }  
    
            
    stage('Test') {
      steps {
        nodejs "node" {
          sh 'echo npm test'
        }
      }
    }


    stage('Docker') {
      steps {
        sh 'docker build -t ganglia .'
      }
    }
  }
}
