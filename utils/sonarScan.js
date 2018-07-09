const $ = require('shelljs');

function scan(zipped, unzipped, path, login){

    return new Promise((resolve, reject) => {
        $.cd(path);
        $.exec('tar -xzvf '+zipped, {async: true}, (code, stdout, stderr) => {
            if(stderr)
                reject(new Error(stderr.message));
            $.touch(path + unzipped + '/sonar-project.properties');
            $.exec('echo '
                + '\'sonar.login=' + login + '\n'
                // + 'sonar.password=\n'
                + 'sonar.projectKey=' + zipped.split('.')[0] + '\n'
                + 'sonar.projectName=' + zipped.split('.')[0] + '\n'
                + 'sonar.projectVersion=1.0\n'
                + 'sonar.sources=.\n'
                + 'sonar.java.binaries=./target\n'
                + '\n'
                + 'sonar.sourceEncoding=UTF-8\n\''
                + '> '
                + path + unzipped + '/'
                + 'sonar-project.properties');
            $.cd(path + unzipped);
            $.exec('sonar-scanner -X');
            $.rm('-rf', path + unzipped);
            $.rm(path + zipped);
            resolve();
        });
    }).catch((err) => {
        throw err;
    });
}

module.exports = {
    scan
};