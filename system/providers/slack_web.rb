Application.register_provider(:slack_web) do
  prepare do
    require "slack-ruby-client"

    Slack.configure { |config| config.token = ENV["SLACK_API_TOKEN"] }

    register(:slack_web, Slack::Web::Client.new)
  end

  start do
    target.start :settings

    container[:slack_web].auth_test unless target[:settings].config.slack.web.skip_auth
  end
end
