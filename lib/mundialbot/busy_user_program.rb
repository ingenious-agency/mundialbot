module Mundialbot
  class BusyUserProgram
    def start!
      Application[:slack_real_time].on :message do |data|
        message = Message.new(text: data.text, channel: data.channel)
        next unless message.mentions?

        matches_response = Application[:games_api].today_matches
        matches = Match.parse_collection matches_response.parsed_response["matches"]

        matches.each do |game|
          if (users = game.includes?(message.users))
            text <<-TEXT
            #{users.map(&:name).join(",")} #{users.length > 1 ? "are" : "is"} watching #{game}.
            They'll probably respond after the match ends
            TEXT
            web_client.chat_postMessage(channel: message.channel, text: text)
          end
        end
      end
    end
  end
end
