module Mundialbot
  class Team < Dry::Struct
    attribute :id, Types::Integer
    attribute :name, Types::String
    attribute? :short_name, Types::String

    def to_s
      short_name || name
    end
  end
end
