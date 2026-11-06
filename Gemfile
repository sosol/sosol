source 'https://rubygems.org'

if RUBY_PLATFORM == 'java'
  ruby '3.4.5', engine: 'jruby', engine_version: '10.0.6.0'
else
  ruby '3.4.12'
end

gem 'rails', '~> 8.0', '< 8.1'

# Needed for the new asset pipeline
gem 'coffee-rails'
gem 'sass-rails', '~> 6'
gem 'therubyrhino'
gem 'uglifier', '>= 1.0.3'

group :test do
  gem 'database_cleaner-active_record'
  gem 'factory_bot_rails'
  gem 'mocha'
  gem 'rails-controller-testing'
  gem 'rake'
  gem 'shoulda-context'
  gem 'shoulda-matchers'
end

group :development, :test do
  gem 'rubocop'
  gem 'rubocop-minitest'
  gem 'rubocop-performance'
  gem 'rubocop-rails'
  gem 'rubocop-rake'
end

if RUBY_PLATFORM == 'java'
  gem 'activerecord-jdbc-adapter', '>= 80.0.pre1', '< 81', platform: :jruby
  gem 'activerecord-jdbcmysql-adapter', '>= 80.0.pre1', '< 81', platform: :jruby
  gem 'activerecord-jdbcpostgresql-adapter', '>= 80.0.pre1', '< 81', platform: :jruby
  gem 'activerecord-jdbcsqlite3-adapter', '>= 80.0.pre1', '< 81', platform: :jruby
  gem 'jruby-jars', JRUBY_VERSION
  gem 'jdbc-mysql', require: false
  gem 'jdbc-sqlite3', '>= 3.7.2', platform: :jruby
  gem 'rinda'
  gem 'tzinfo-data', platform: :jruby
else
  gem 'rugged'
  gem 'postgresql'
  gem 'sqlite3', '~> 2.1'
  gem 'tzinfo-data'
end

gem 'haml-rails'
gem 'jquery-rails'
gem 'logger'
gem 'sass'
gem 'actionpack-page_caching'
gem 'activerecord-session_store'
gem 'airbrake'
gem 'airbrake-ruby'
gem 'capistrano', '~> 2.15.0'
gem 'devise', '~> 4.8'
gem 'dotenv-rails'
gem 'dynamic_form'
gem 'handle_invalid_percent_encoding_requests'
gem 'httpclient'
gem 'i18n'
gem 'json', '>=1.6.6'
gem 'lograge'
gem 'minitest', '< 6'
gem 'nokogiri'
gem 'omniauth-google-oauth2'
gem 'omniauth-rails_csrf_protection'
gem 'pry', '~> 0.15.0'
gem 'pry-rails', '~> 0.3.9'
gem 'puma', '< 7'
gem 'rack', '>= 1.1.0', '< 3'
gem 'rack-attack', '~> 6.0'
gem 'rapporteur'
gem 'rexml'
gem 'rinda'
gem 'rubyzip', '~> 2'
gem 'silencer'
gem 'sucker_punch', '~> 3.0'
gem 'thwait'
gem 'webrick'
gem 'with_advisory_lock'
gem 'zip-zip'
