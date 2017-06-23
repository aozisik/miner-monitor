const _ = require("lodash");
const Shell = require("../shell");

const command = Shell("nvidia-smi")
    .arg("query-gpu", [
        "uuid",
        "name",
        "temperature.gpu",
        "fan.speed",
        "utilization.gpu",
        "clocks.current.memory"
    ])
    .arg("format", ["csv", "noheader"]);

const formatOutput = function(output) {
    return _.chain(output.split("\n")).map(function(line) {
            // Normalize data
            const cells = _.map(line.split(","), function(cell) {
                return _.trim(cell);
            });
            // Convert to object
            return _.zipObject([
                "id",
                "name",
                "temperature",
                "fan",
                "load",
                "clock"
            ], cells);
        })
        .filter(function(line) {
            return 'id' in line && line.id;
        })
        .value();
};

module.exports = function() {
    return command.run().then((output) => {
        return formatOutput(output);
    });
};
