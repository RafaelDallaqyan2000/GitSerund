pipeline {
  agent any

  stages {
    
    stage('Build') {
      steps {
        sh 'export CI=false && npm install'
        sh 'export CI=false && npm run build'
      }
    }
    stage('Copy Files') {
      steps {
        
        script {

                    def branch = env.BRANCH_NAME
                    def destDir
                    
                    if (branch == 'main') {
                        destDir = '/data/Back_with_build/client'
                    } else if (branch == 'current') {
                        destDir = '/data/Back_with_build_dev/client'
                    } else if (branch == 'staging') {
                        destDir = '/data/Back_with_build_staging/client'
                    } else if (branch == 'staging2') {
                        destDir = '/data/Back_with_build_staging2/client'
                    } else if (branch == 'staging3') {
                        destDir = '/data/Back_with_build_staging3/client'
                    } else if (branch == 'staging3_1') {
                        destDir = '/data/Back_with_build_staging3_1/client'
                    } else {
                      return 
                    }
          
          
                    
                    echo "Branch is ${branch}"
                    echo "destDir is ${destDir}"

                    echo "Branch is ${branch}"
                    echo "destDir is ${destDir}"
          
                    sh "whoami"
                    sh "rm -rf ${destDir}/*"
                    sh "mkdir -p ${destDir}" // create destination directory if it doesn't exist
                    sh "yes | cp -rf build/* ${destDir}" // copy build files to destination
          
          
                }
        
        

      }
    }
  }
  
  
  post {

        success {
          slackSend(color: 'good', message: "*${env.BRANCH_NAME.toUpperCase()}* environment updated successfully :white_check_mark:")
        }
        
        failure {
            slackSend(color: 'danger', message: "*${env.BRANCH_NAME.toUpperCase()}* environment update failed :cry:")
        }
  }
  
}
