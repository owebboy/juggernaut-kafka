var util     = require("util");
var kafka   = require("./kafka");
var Message = require("./message");
var Channel = require("./channel");

Publish = module.exports = {};
Publish.listen = function(){
  this.client = kafka.createClient();
  
  this.client.on("message", function(topic, data) {
    util.log("Received: " + data);
    
    try {
      var message = Message.fromJSON(data);
    } catch(e) { return; }
    
    Channel.publish(message);
  });
  
  var client = this.client;

  client.connect(function() {
    client.subscribeTopic({name: "juggernaut", partition: 0})
  });

  this.client = client;

};
