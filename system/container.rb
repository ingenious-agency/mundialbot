class Application < Dry::System::Container
  configure do |config|
    config.component_dirs.add "services"
  end
end
