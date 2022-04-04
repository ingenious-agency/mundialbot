Application.register_provider(:settings) do
  prepare do
    register(:settings, Setting)
  end
end

class Setting
  extend Dry::Configurable

  def self.env
    ENV["RACK_ENV"] || "development"
  end

  setting :slack do
    setting :web do
      setting :skip_auth, default: Setting.env != "production"
    end
  end

  setting :games_api do
    setting :access_key, default: ENV["GAMES_API_ACCESS_KEY"]
  end
end
