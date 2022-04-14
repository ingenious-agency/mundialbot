module Mundialbot
  class Message < Dry::Struct
    SLACK_ID_REGEX = /<@(.*?)>/

    attribute :channel, Types::String
    attribute :text, Types::String

    def users
      @users ||= text
        .scan(SLACK_ID_REGEX)
        .flatten
        .map { |user_id| Application[:slack_web].users_info user_id } # TODO: Change this to ruby-concurrency
        .map do |user_info_response|
          User.new(
            slack_id: user_info_response.dig(:data, :user, :id),
            name: user_info_response.dig(:data, :user, :name),
            tz: user_info_response.dig(:data, :user, :tz)
          )
        end
    end

    def mentions?
      users.length > 0
    end
  end
end
