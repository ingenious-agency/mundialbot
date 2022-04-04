RSpec.describe Mundialbot::BusyUserProgram do
  subject { program.start! }
  let(:program) { Mundialbot::BusyUserProgram.new }
  let(:games) { [] }
  let(:slack_real_time) { SlackRealTime.new }

  before do
    games_api = double(:games_api)
    allow(games_api).to receive(:today_matches).and_return({
      count: 1,
      filters: {
        dateFrom: "2022-04-10",
        dateTo: "2022-04-20",
        permission: "TIER_ONE",
        competitions: [2013]
      },
      matches: [
        {
          id: 390394,
          competition: {
            id: 2013,
            name: "Campeonato Brasileiro Série A",
            area: {
              name: "Brazil",
              code: "BRA",
              ensignUrl: "https://crests.football-data.org/764.svg"
            }
          },
          season: {
            id: 1377,
            startDate: "2022-04-10",
            endDate: "2022-11-13",
            currentMatchday: 1,
            winner: null
          },
          utcDate: "2022-04-10T00:00:00Z",
          status: "SCHEDULED",
          matchday: 1,
          stage: "REGULAR_SEASON",
          group: null,
          lastUpdated: "2022-04-02T16:20:05Z",
          odds: {
          },
          score: {
            winner: null,
            duration: "REGULAR",
            fullTime: {
              homeTeam: null,
              awayTeam: null
            },
            halfTime: {
              homeTeam: null,
              awayTeam: null
            },
            extraTime: {
              homeTeam: null,
              awayTeam: null
            },
            penalties: {
              homeTeam: null,
              awayTeam: null
            }
          },
          homeTeam: {
            id: 1769,
            name: "SE Palmeiras"
          },
          awayTeam: {
            id: 1837,
            name: "Ceará SC"
          },
          referees: []
        }
      ]
    })
    Application.stub("games_api", games_api)
    Application.stub("slack_real_time", slack_real_time)
  end

  it "works" do
    subject
    slack_real_time.emit :message, double(:data, text: "Hola!", channle: "team-general")
  end
end
