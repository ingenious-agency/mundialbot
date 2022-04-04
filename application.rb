require "dotenv/load"
require "dry-struct"
require "dry-types"
require "zeitwerk"
require "dry/system/container"

loader = Zeitwerk::Loader.new
loader.push_dir("#{__dir__}/lib")
loader.setup

require_relative "./system/container"
require_relative "./system/import"
