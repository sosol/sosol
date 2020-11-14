/**** provenance ****/

function provenanceOrigPlaceUnknownToggle(unknown){
  if(unknown.checked){
    
    if((jQuery('#multiItems_provenance li.provenance').length == 0) || confirm('Delete all provenance entries?')){
      // set value
      jQuery('#geoPreview').innerHMTL = 'unbekannt';

      // hide data pane
      jQuery('#multi_provenance').hide();

      // delete geo data
      jQuery('#multiItems_provenance').innerHTML = '';
    } else {
      unknown.checked = false;
    }

  } else {
   // reset value
   jQuery('#geoPreview').innerHMTL = '';
   
   // show data pane
   jQuery('#multi_provenance').show();
  }
}

/**** publication ****/

function publicationPreview(){
  preview = jQuery('#apis_identifier_publicationTitle').getValue() + ' ' + 
            jQuery('#apis_identifier_publicationExtra_0_value').getValue() + ' ' +
            jQuery('#apis_identifier_publicationExtra_1_value').getValue() + ' ' +
            jQuery('#apis_identifier_publicationExtra_2_value').getValue() + ' ' +
            jQuery('#apis_identifier_publicationExtra_3_value').getValue() + ' ';

  jQuery('#multiItems_publicationExtra').select('input').each(function(i, input){
   
    if(input.type.toLowerCase() != 'hidden'){
      preview += input.getValue() + ' ';
    }
  });
  
  jQuery('#publicationExtraFullTitle').innerHTML = preview;
}

/**** date ****/

function hideDateTabs(){
  if(jQuery('#apis_identifier_textDate_1_attributes_id')[0].parentNode.getElementsBySelector('span')[0].innerHTML.indexOf('(') >= 0){
    
    // hide date tabs
    jQuery('div#dateContainer div.dateItem div.dateTab').each(function(i, e){e.hide();});
    
    // activate show-button
    jQuery('.showDateTabs').each(function(e){e.observe('click', function(i, ev){showDateTabs();});});

  } else {

    // hide show-button
    jQuery('.showDateTabs').each(function(i, e){e.hide();});
  }
}

function showDateTabs(){
  jQuery('div#dateContainer div.dateItem div.dateTab').each(function(i, e){e.show();});
  jQuery('.showDateTabs').each(function(e){e.hide();});
}

function openDateTab(dateId)
{
  jQuery('div#edit div#dateContainer div.dateItem').each(function(i, dateItem){
    dateItem.removeClassName('dateItemActive');
  });
  jQuery('div#edit div#dateContainer div.dateItem' + dateId).each(function(i, dateItem){
    dateItem.addClassName('dateItemActive');
  });
  
  toggleMentionedDates('#dateAlternative' + dateId);
}

function toggleMentionedDates(dateId){
  jQuery('ul#multiItems_mentionedDate > li').each(function(index, li){
      value = li.select('select.dateId')[0].value;
      if(value == dateId || value == ''){
        li.style.display = 'block';
      }
      else{
        li.style.display = 'none';
      }
  });
  jQuery('#mentionedDate_dateId').value = dateId;
}

/**** multi ****/

function multiAdd(id)
{
  var value = jQuery('#multiPlus_' + id + ' > input')[0].value;

  var index = multiGetNextIndex(id);

  var item = '<li class="' + id + '">' +
             '  <input type="text" value="' + value + '" name="apis_identifier_' + id + '" id="apis_identifier_' + id + '_' + index + '"' +
             ' class="observechange apis_identifier_' + id + '">' +
             '  <span onclick="multiRemove(this.parentNode)" class="delete">x</span>' +
             '  <span class="move">o</span>' +
             '</li>';

  multiUpdate(id, item);
  jQuery('#multiPlus_' + id + ' > input')[0].value = "";
}

function multiAddTextarea(id)
{
  var value = jQuery('#multiPlus_' + id + ' > textarea')[0].value;

  var index = multiGetNextIndex(id);

  var item = '<li class="' + id + '">' +
             '  <textarea name="apis_identifier_' + id + '" id="apis_identifier_' + id + '_' + index + '"' +
             ' class="observechange apis_identifier_' + id + '">' + value +'</textarea>' +
             '  <span onclick="multiRemove(this.parentNode)" class="delete">x</span>' +
             '  <span class="move">o</span>' +
             '</li>';

  multiUpdate(id, item);
  jQuery('#multiPlus_' + id + ' > textarea')[0].value = "";
}

function multiAddGenre()
{
  var value = jQuery('#multiPlus_genre > input')[0].value;

  var index = multiGetNextIndex('genre');

  var item = '<li class="genre">' +
             '  <input type="text" value="' + value + '" name="apis_identifier_genre" id="apis_identifier_genre_' + index + '"' +
             ' class="observechange apis_identifier_genre">' +
             '  <span onclick="multiRemove(this.parentNode)" class="delete">x</span>' +
             '  <span class="move">o</span>' +
             '</li>';

  multiUpdate('genre', item);
  jQuery('#multiPlus_genre > input')[0].value = "";
}

function multiAddCitation() {
  var index = multiGetNextIndex('citation');
  var item = '<li class="citation">' +
             '  <label class="apis" for="apis_identifier_citation" id="apis_identifier_citation_label">Citation</label>' +
             '  <input class="observechange apis_identifier_citation" id="apis_identifier_citation" name="apis_identifier_citation" type="text" value="" />' +
             '  <label class="apis" for="apis_identifier_citeNote" id="apis_identifier_citeNote_label">Note</label>' +
             '  <textarea class="observechange apis_identifier_citeNote" id="apis_identifier_citeNote" name="apis_identifier_citeNote" value="" />' +
             '  <label class="apis" for="apis_identifier_citeType" id="apis_identifier_citeType_label">DDbDP?</label>' +
             '  <input id="apis_identifier_citeType" name="apis_identifier_citeType" type="checkbox" value="ddbdp" class="apis_identifier_citeType/>' +
             '  <span onclick="multiRemove(this.parentNode)" class="delete">x</span>' +
             '  <span class="move">o</span>' +
             '</li>';
  multiUpdate('citation', item);
}

function multiAddFigures()
{
  var index = multiGetNextIndex('figure');
  var item = '<li>' +
             '  <label class="apis" for="apis_identifier_figHead_' + index + '" id="apis_identifier_figHead_' + index + '_label_">Image Label</label>' +
             '  <input class="observechange apis_identifier_figHead" id="apis_identifier_figHead_' + index + '" name="apis_identifier_figHead" type="text" value="" />' +
             '  <label class="apis" for="apis_identifier_figDesc" id="apis_identifier_figDesc_label">Description</label>' +
             '  <textarea class="observechange" id="apis_identifier_figDesc_' + index + '" name="apis_identifier_figDesc" value="" />' +
             '  <label class="apis" for="apis_identifier_figUrl" id="apis_identifier_figUrl_label">Image URL</label>' +
             '  <input class="observechange apis_identifier_figUrl" id="apis_identifier_figUrl_' + index + '" name="apis_identifier_figUrl" type="text" value="" />' +
             '  <span onclick="multiRemove(this.parentNode)" class="delete">x</span>' +
             '  <span class="move">o</span>' +
             '</li>';

  multiUpdate('figure', item);
}

function multiAddFacsimiles()
{
  var index = multiGetNextIndex('facsimile');
  var item = '<li class="facsimile" id="" style="position: relative;">' +
             '   <label class="apis" for="apis_identifier_surfaceGrpId_' + index + '" id="apis_identifier_surfaceGrpId_label_' + index + '">Object ID</label>' +
             '  <input class="observechange apis apis_identifier_surfaceGrpId" id="apis_identifier_surfaceGrpId_' + index + 
                  '" name="apis_identifier_surfaceGrpId_' + index + '" type="text" value="">' +
             '  <label class="apis" for="apis_identifier_surfaceType1_' + index + '" id="apis_identifier_surfaceType1_label_' + index + '">Side 1</label>' +
             '  <input class="observechange apis apis_identifier_surfaceType" id="apis_identifier_surfaceType_' + index + 
                  '" name="apis_identifier_surfaceType_' + index + '" type="text" value="">' +
             '  <label class="apis" for="apis_identifier_facsUrl_' + index + '" id="apis_identifier_facsUrl_label_' + index + '">Image URL</label>' +
             '  <input class="observechange apis apis_identifier_facsUrl" id="apis_identifier_facsUrl_' + index + 
                  '" name="apis_identifier_facsUrl_' + index + '" type="text" value="">' +
             '  <label class="apis" for="apis_identifier_surfaceType2_' + index + '" id="apis_identifier_surfaceType2_label_' + index + '">Side 2</label>' +
             '  <input class="observechange apis apis_identifier_surfaceType2" id="apis_identifier_surfaceType2_' + index + 
                  '" name="apis_identifier_surfaceType2" type="text" value="">' +
             '  <label class="apis" for="apis_identifier_facsUrl_' + index + '" id="apis_identifier_facsUrl_label_' + index + '">Image URL</label>' +
             '  <input class="observechange apis apis_identifier_facsUrl2" id="apis_identifier_facsUrl2_' + index + 
                  '" name="apis_identifier_facsUrl2_' + index + '" type="text" value="">' +
             '  <span class="delete" onclick="multiRemove(this.parentNode)" title="delete">x</span>' +
             '  <span class="move" title="move">o</span>' +
            '</li>';

  multiUpdate('facsimile', item);
}


function multiGetNextIndex(id)
{
  var path = '#multiItems_' + id + ' > li';
  return jQuery(path).length;
}

function multiUpdate(id, newItem)
{
  jQuery('#multiItems_' + id).append(newItem);
  var foo = jQuery('#multiItems_' + id);
  jQuery('#multiPlus_' + id + ' > input').each(function(i, item){item.clear();});
  jQuery('#multiPlus_' + id + ' > select').each(function(i, item){item.clear();});

  Sortable.create('multiItems_' + id, {overlap: 'horizontal', constraint: false, handle: 'move'});
}

function multiRemove(item)
{
  if(confirm('Do you really want to delete me?')){
    item.parentNode.removeChild(item);
  };
}

/**** mentioned dates ****/

function mentionedDateNewDate(dateinput)
{
  var index = dateinput.id.match(/\d+/)[0];
  var date1 = jQuery('#apis_identifier_mentionedDate_' + index + '_date1').value;
  var date2 = jQuery('#apis_identifier_mentionedDate_' + index + '_date2').value;
  
  if(date2 && date2 != ''){
    jQuery('#apis_identifier_mentionedDate_' + index + '_children_date_attributes_notBefore').value = date1;
    jQuery('#apis_identifier_mentionedDate_' + index + '_children_date_attributes_notAfter').value  = date2;
  } else {
    jQuery('#apis_identifier_mentionedDate_' + index + '_children_date_attributes_when').value      = date1;
  }

  mentionedDateNewCertainty(jQuery('#apis_identifier_mentionedDate_' + index + '_certaintyPicker')); // update certainties as well
}

function mentionedDateGetDateTyes(index){
  var dateTypes = ['when', 'notBefore', 'notAfter'];
  var result = [];

  var dateTypeIndex = 0;
  for(dateTypeIndex = 0; dateTypeIndex < dateTypes.length; dateTypeIndex++){
    var dateType = jQuery('#apis_identifier_mentionedDate_' + index + '_children_date_attributes_' +  dateTypes[dateTypeIndex]);
    if(dateType && dateType.value && dateType.value.length){
      result[result.length] = dateTypes[dateTypeIndex];
    }
  }
  
  return result;
}



/**** check ****/

function checkNotAddedMultiples(){
  multiAddTextarea('generalNote');
  multiAdd('associatedName');
  multiAdd('keyword');  
  multiAddGenre();
}

function toggleReferenceList(){
  actionElement = jQuery('#toggleReferenceList');
  
  var display = '';
  
  if(actionElement.hasClassName('showReferenceList')){
    actionElement.removeClassName('showReferenceList');
    actionElement.addClassName('hideReferenceList');
    actionElement.innerHTML = 'hide geo references';
    display = 'block';
  } else {
    actionElement.removeClassName('hideReferenceList');
    actionElement.addClassName('showReferenceList');
    actionElement.innerHTML = 'show geo references';
    display = 'none';
  }

  jQuery('div.geoReferenceContainer').each(function(i, e){ e.setStyle( {'display' : display } ); });

}


