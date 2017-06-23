const _ = require("lodash");
const shell = require("shelljs");
const Promise = require("bluebird");

function Shell(command) {

    this.arg = (argument, value) => {
        if (_.isArray(value)) {
            value = value.join(",");
        }
        command += " --" + argument + "=" + value;
        return this;
    };

    this.run = () => {
        return new Promise((resolve, reject) => {
            shell.exec(command, function(code, stdout, stderr) {
                if (stderr) {
                    reject(new Error(stderr));
                    return;
                }
                resolve(stdout);
                return;
            });
        });
    };
}

module.exports = function(cmd) {
    return new Shell(cmd);
};
