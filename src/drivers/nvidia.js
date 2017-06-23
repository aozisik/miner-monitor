const _ = require("lodash");
const Shell = require("../shell");

const command = Shell("nvidia-smi")
    .arg("query-qpu", [
        "index",
        "name",
        "temperature.gpu",
        "clocks.current.video"
    ])
    .arg("format", ["csv", "noheader"]);

const formatOutput = function(output) {
    return _.chain(output.split("\n")).map(function(line) {
            // Normalize data
            line = _.chain(line)
                .split(",")
                .map(function(cell) {
                    return _.trim(cell);
                })
                .value();
            // Convert to object
            return _.zipObject([
                "id",
                "name",
                "temperature",
                "clock"
            ], line);
        })
        .filter(function(line) {
            return line[0];
        })
        .value();
};

module.exports = function() {
    return command.run().then((output) => {
    	return formatOutput(output);
    });
};
