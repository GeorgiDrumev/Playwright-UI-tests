pipeline {
    agent any

    stages {
        stage('Run Tests') {
            steps {
                sh '''
                    docker build -t playwright-tests .
                    docker run --rm \
                        -v $(pwd)/playwright-report:/app/playwright-report \
                        -v $(pwd)/test-results:/app/test-results \
                        playwright-tests npm test
                '''
            }
        }
    }
    
    post {
        always {
            junit testResults: 'test-results/junit.xml', allowEmptyResults: true
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Test Report',
                includes: '**/*',
                escapeUnderscores: false
            ])
        }
    }
}
