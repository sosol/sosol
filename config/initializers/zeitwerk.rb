Rails.autoloaders.each do |autoloader|
  autoloader.inflector = Zeitwerk::Inflector.new
  autoloader.inflector.inflect(
    "jruby" => "JRuby",
    "cts" => "CTS",
    "tei" => "TEI",
    "oac" => "OAC",
    "ddb" => "DDB",
    "hgv" => "HGV",
    "dclp" => "DCLP",
    "apis" => "APIS",
    "ddb_identifier" => "DDBIdentifier",
    "ddb_identifiers_controller" => "DDBIdentifiersController",
    "hgv_identifier" => "HGVIdentifier",
    "hgv_meta_identifier" => "HGVMetaIdentifier",
    "hgv_trans_identifier" => "HGVTransIdentifier",
    "hgv_trans_identifiers_controller" => "HGVTransIdentifiersController",
    "hgv_trans_glossary" => "HGVTransGlossary",
    "hgv_trans_glossaries_controller" => "HGVTransGlossariesController",
    "hgv_meta_identifier_helper" => "HGVMetaIdentifierHelper",
    "hgv_meta_identifiers_controller" => "HGVMetaIdentifiersController",
    "dclp_meta_identifier" => "DCLPMetaIdentifier",
    "dclp_meta_identifier_helper" => "DCLPMetaIdentifierHelper",
    "dclp_meta_identifiers_controller" => "DCLPMetaIdentifiersController",
    "dclp_text_identifier" => "DCLPTextIdentifier",
    "dclp_text_identifier_helper" => "DCLPTextIdentifierHelper",
    "dclp_text_identifiers_controller" => "DCLPTextIdentifiersController",
    "apis_identifier" => "APISIdentifier",
    "apis_identifier_helper" => "APISIdentifierHelper",
    "apis_identifiers_controller" => "APISIdentifiersController",
    "cts_identifier" => "CTSIdentifier",
    "cts_inventory_identifier" => "CTSInventoryIdentifier",
    "cts_oac_identifier" => "CTSOACIdentifier",
    "cts_oac_identifiers_controller" => "CTSOACIdentifiersController",
    "cts_proxy_controller" => "CTSProxyController",
    "citation_cts_identifier" => "CitationCTSIdentifier",
    "citation_cts_identifiers_controller" => "CitationCTSIdentifiersController",
    "cts_inventory_identifiers_controller" => "CTSInventoryIdentifiersController",
    "cts_publication" => "CTSPublication",
    "cts_publications_controller" => "CTSPublicationsController",
    "epi_cts_identifier" => "EpiCTSIdentifier",
    "epi_cts_identifiers_controller" => "EpiCTSIdentifiersController",
    "epi_trans_cts_identifier" => "EpiTransCTSIdentifier",
    "epi_trans_cts_identifiers_controller" => "EpiTransCTSIdentifiersController",
    "tei_cts_identifier" => "TEICTSIdentifier",
    "tei_cts_identifiers_controller" => "TEICTSIdentifiersController",
    "tei_trans_cts_identifier" => "TEITransCTSIdentifier",
    "tei_trans_cts_identifiers_controller" => "TEITransCTSIdentifiersController",
    "oac_identifier" => "OACIdentifier",
    "oac_identifiers_controller" => "OACIdentifiersController",
    "numbers_rdf" => "NumbersRDF",
    "jruby_xml" => "JRubyXML",
    "jgit" => "JGit"
  )
end
