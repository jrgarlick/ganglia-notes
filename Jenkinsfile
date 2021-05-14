pipeline {
  agent any
    
  tools { nodejs "node" }
    
  stages {
        
    stage('Checkout project') {
      steps {
          checkout scm
      }
    }
     
    stage('Install Dependencies') {
      steps {
        sh 'echo npm install'
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
