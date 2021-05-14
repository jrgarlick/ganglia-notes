pipeline {
//   agent any
    
//   tools { nodejs "node" }
  agent { docker { image 'node:14-alpine' } }    

  stages {
        
    stage('Checkout project') {
      steps {
          checkout scm
      }
    }
     
    stage('Install Dependencies') {
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
