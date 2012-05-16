#!/usr/bin/env node
var argv = require("optimist").argv,
    util = require("util");

var help = [
    "usage: juggernaut [options] ",
    "",
    "Starts a juggernaut server using the specified command-line options",
    "",
    "options:",
    "  --kafka-host  HOST  HOST for kafka server. Default: localhost.",
    "  --kafka-port  PORT  Port that the kafka server is listening on. Default: 9092.",
    "  --port   PORT       Port that the proxy server should run on",
    "  --silent            Silence the log output",
    "  -h, --help          You're staring at it"
].join('\n');

if (argv.h || argv.help) {
  return util.puts(help);
}

process.env.kafka_host = argv['kafka-host'] || "localhost";
process.env.kafka_port = argv['kafka-port'] || 9092;

Juggernaut = require("./index");
Juggernaut.listen(argv.port);
