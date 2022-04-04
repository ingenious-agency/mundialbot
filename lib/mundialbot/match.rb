module Mundialbot
  class Game < Dry::Struct
    STATUSES = {
      scheduled: "scheduled",
      postponed: "postponed",
      canceled: "canceled",
      suspended: "suspended",
      in_play: "in_play",
      paused: "paused",
      finished: "finished",
      awarded: "awarded"
    }

    attribute :id, Types::Integer
    attribute :home_team, Team
    attribute :home_score, Types::Integer
    attribute :away_team, Team
    attribute :away_score, Types::Integer
    attribute :time, Types::Integer
    attribute :status, Types::String

    def finished?
      status == STATUSES[:finished]
    end

    def scheduled?
      status == STATUSES[:scheduled]
    end

    def in_play?
      status == STATUSES[:in_play]
    end

    def paused?
      status == STATUSES[:paused]
    end

    def to_s
      "minute #{time} of #{local_team} (#{local_score}) vs. #{away_team} (#{away_score})"
    end

    def self.parse_collection(matches)
      matches.map do |match|
        Match.new(
          id: match["id"],
          home_team: Team.new(id: match.dig("homeTeam", "id"), name: match.dig("homeTeam", "name")),
          home_score: match.dig("score", "extraTime", "homeTeam") || match.dig("score", "fullTime", "homeTeam") || match.dig("score", "halfTime", "homeTeam"),
          away_team: Team.new(id: match.dig("awayTeam", "id"), name: match.dig("awayTeam", "name")),
          away_score: match.dig("score", "extraTime", "awayTeam") || match.dig("score", "fullTime", "awayTeam") || match.dig("score", "awayTeam", "homeTeam"),
          time: 0
        )
      end
    end
  end
end
