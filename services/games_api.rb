require "httparty"

class GamesAPI
  include Import[:settings]
  include HTTParty
  base_uri "api.football-data.org"

  def initialize(**arg)
    super
    @options = {headers: {"X-Auth-Token": settings.config.games_api.access_key}}
  end

  def matches(competition_id:, from:, to:, status:)
    query = {
      competitions: competition_id,
      from: from,
      to: to,
      status: status
    }
    get("/v2/matches", @options.merge({query: query}))
  end

  def today_matches(competition_id:, status:)
    today = Date.today.utc
    matches(competition_id: competition_id, status: status, from: today, to: today)
  end
end
