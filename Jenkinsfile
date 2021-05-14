pipeline {
  agent any
    
  tools {nodejs "node"}
    
  stages {
        
    stage('Git') {
      steps {
          scm checkout
      }
    }
     
    stage('Build') {
      steps {
        sh 'npm install'
        // sh 'npm build'
      }
    }  
    
            
    stage('Test') {
      steps {
        sh 'echo npm test'
      }
    }


    stage('Docker') {
      steps {
        sh 'docker build -t ganglia .'
      }
    }
  }
}