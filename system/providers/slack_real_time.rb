Application.register_provider(:slack_real_time) do
  prepare do
    require "slack-ruby-client"
    require "async"

    Slack.configure { |config| config.token = ENV["SLACK_API_TOKEN"] }

    register(:slack_real_time, Slack::RealTime::Client.new)
  end
end
