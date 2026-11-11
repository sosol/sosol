class TallyVotesJob
  include SuckerPunch::Job

  def perform(publication_id, related_votes)
    Rails.logger.debug do
      "TallyVotesJob started (publication_id: #{publication_id}, related_votes: #{related_votes.inspect})"
    end
    Rails.logger.flush if Rails.logger.respond_to? :flush
    publication = Publication.find(publication_id)
    if Rails.env.test? && (ActiveRecord::Base.connection.adapter_name == 'SQLite3')
      publication.transaction do
        publication.tally_votes(related_votes)
      end
    else
      publication.with_advisory_lock("tally_votes_#{publication_id}") do
        publication.transaction do
          publication.tally_votes(related_votes)
        end
      end
    end
  ensure
    Rails.logger.debug { "TallyVotesJob finished (publication_id: #{publication_id})" }
    Rails.logger.flush if Rails.logger.respond_to? :flush
  end
end
