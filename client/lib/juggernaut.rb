require "kafka"
require "json"

# Attempt to provide Engine to Rails
require "juggernaut/rails/engine"

module Juggernaut
  
  def options
    @options ||= {}
  end
  
  def options=(val)
    @options = val
  end
  
  def url=(url)
    options[:url] = url
  end
  
  def publish(channels, data, options = {})
    message = ({:channels => Array(channels).uniq, :data => data}).merge(options)
    message = Kafka::Message.new(message.to_json)

    kafka.send(message) 
  end
  
  def subscribe
    consumer.loop do |msg|
       yield("juggernaut", JSON.parse(msg))
    end
  end
  
  protected
    def kafka
      @kafka ||= Kafka::Producer.new({:topic => 'juggernaut', :partition => 0}.merge(options))
    end

    def consumer
      @consumer ||= Kafka::Consumer.new(:topic => 'juggernaut')
    end
  
    def key(*args)
      args.unshift(:juggernaut).join(":")
    end

    extend self
end