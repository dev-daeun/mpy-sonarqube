const os = require('os');
const fs = require('fs');
const monitor = require('pg-monitor');

monitor.setTheme('matrix'); // changing the default theme;


// Log file for database-related errors:
const logFile = __dirname + '/logs/errors.log';


monitor.setLog((msg, info) => {
    info.display = true;
    if (info.event === 'error') {
        let logText = os.EOL + msg; // line break + next error message;
        if (info.time) {
            // If it is a new error being reported,
            // and not an additional error line;
            logText = os.EOL + logText; // add another line break in front;
        }
        fs.appendFileSync(logFile, logText); // add error handling as required;
    }

});

module.exports = monitor;