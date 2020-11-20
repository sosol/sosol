/**** multi ****/

function multiAdd(id, minimumIndex = 0, pathToActualValue = null) {
  if(jQuery('#multiPlus_' + id + ' > input') && jQuery('#multiPlus_' + id + ' > input').length){
    var value = jQuery('#multiPlus_' + id + ' > input')[0].value;
    var idSuffix   = typeof pathToActualValue == 'string' ? '_' + pathToActualValue : '';
    var nameSuffix = typeof pathToActualValue == 'string' ? '[' + pathToActualValue.replace(/_/g, '][') + ']' : '';

    var index = multiGetNextIndex(id);
    if((typeof minimumIndex == 'number') && (index < minimumIndex)){
      index = minimumIndex;
    }

    var item = '<li>' +
               '  <input type="text" value="' + value + '" name="hgv_meta_identifier[' + id + '][' + index + ']' + nameSuffix + '" id="hgv_meta_identifier_' + id + '_' + index + idSuffix + '" class="observechange">' +
               '  <span onclick="multiRemove(this.parentNode)" class="delete">x</span>' +
               '  <span class="move">o</span>' +
               '</li>';

    multiUpdate(id, item);
  }
}

function multiGetNextIndex(id) {
  var path = '#multiItems_' + id + ' > li > input';
  
  if(id == 'origPlace'){
    path = '#multiItems_' + id + ' > li > p > input';
  } else if(id == 'note'){
    path = '#multiItems_' + id + ' > li > textarea';
  }
  
  var index = 0;
  jQuery(path).each(function(i, item){
    var itemIndex = item.id.match(/(\d+)[^\d]*$/)[1] * 1;
    if(index <= itemIndex){
      index = itemIndex + 1;
    }
  });
  return index;
}

function multiUpdate(id, newItem) {
  jQuery('#multiItems_' + id).append(newItem);

  jQuery('#multiPlus_' + id + ' > input').val('');
  jQuery('#multiPlus_' + id + ' > select').val('');
  jQuery('#multiPlus_' + id + ' > textarea').val('');

  Sortable.create('multiItems_' + id, {overlap: 'horizontal', constraint: false, handle: 'move'});
}

function multiRemove(item) {
  if(confirm('Do you really want to delete me?')){
    item.parentNode.removeChild(item);
  };
}

/**** toggle view ****/

function toggleCatgory(event) {
  if(!this.next().visible()){
    $(this).next().show();
  } else {
    $(this).next().hide();
  }
}

function rememberToggledView(){
  var expansionSet = '';

  jQuery('.category').each(function(i, e){

    if(e.next().visible()){
      expansionSet += e.classNames().reject(function(item){
        return item == 'category' ? true : false;
      })[0] + ';';
    }
  });

  jQuery('#expansionSet').value = expansionSet;

  return expansionSet;
}

function showExpansions(){
  var flash = jQuery('#expansionSet').value;
  var anchor_match = document.URL.match(/#[A-Za-z]+/);
  var anchor = anchor_match ? anchor_match[0] : '';
  anchor = anchor.substr(1,1).toLowerCase() + anchor.substr(2);

  var expansionSet = flash + ';' + anchor;
  
  jQuery('.category').each(function(i, e){

    var classy = e.classNames().reject(function(item){
        return item == 'category' ? true : false;
      })[0];

    if(expansionSet.indexOf(classy) >= 0){
      e.next().show();
    }
  });
  jQuery('#expansionSet').value = '';
  return flash;
}


Event.observe(window, 'load', function() {
  showExpansions();
  jQuery('.category').each(function(i, e){e.observe('click', toggleCatgory);});
  jQuery('#expandAll').bind('click', function(e){jQuery('.category').each(function(i, e){e.next().show();});});
  jQuery('#collapseAll').bind('click', function(e){jQuery('.category').each(function(i, e){e.next().hide();});});
});

// todo: if an item has been moved the »observeChange« alert needs to be triggered