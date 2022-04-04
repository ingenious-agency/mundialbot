module Mundialbot
  class User < Dry::Struct
    attribute :slack_id, Types::String
    attribute :name, Types::String
    attribute :tz, Types::String
  end
end
