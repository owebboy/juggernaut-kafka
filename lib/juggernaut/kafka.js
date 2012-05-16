var util   = require("util");
var url   = require("url");
var kafka = require("kafka-fork")

module.exports.createClient = function(){
  var client;

  client = new kafka.Consumer({
    // these are the default values
    name:         'juggernaut',
    host:          process.env.kafka_host,
    port:          process.env.kafka_port,
    pollInterval:  2000,
    topic:         'juggernaut',
    maxSize:       1048576, // 1MB
    partition:     0
  })

  client.on("error", function(error){
    util.error(error);
  });
  
  return client;
};

module.exports.createProducer = function(){
  var client;

  client = new kafka.Producer({
    name:         'juggernaut',
    host:          process.env.kafka_host,
    port:          process.env.kafka_port,
    topic:         'juggernaut',
    partition:     0
  })

  client.connect();

  return client;

};