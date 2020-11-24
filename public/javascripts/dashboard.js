/**
 * @author charles
 */
 function toggleBatchDiv(button_node, div_node)
  {
 
    var button = jQuery(button_node);
    var div = div_node;
    
    var body = document.body;
    
    body.appendChild(div);
    var show_div = true;
    if (div.style.display=="block")
    {
      show_div = false;//div.style.display = "none";
    }
    else
    {
      //div.style.display = "block";
    }    
 
    var batch_boxes = jQuery('div.batch_box');
    for (var i = 0; i < batch_boxes.length; i++) {
      batch_boxes[i].style.display = "none";
    }
    
    if (show_div) {
      div.style.display = "block";
    }
    
    
    div.setStyle({ position: 'absolute', zIndex: '9999'});
    
    var left_pos = button.offset().left - div.getWidth() ;
    var top_pos = button.offset().top  ;
    
    div.style.top = top_pos + "px";
    div.style.left = left_pos + "px";
  }
  
  
  
  
  

  function showVotes(button_node, vote_node, show)
  {
    
    var button = jQuery(button_node);
    var vote = jQuery(vote_node);
     
    var body = document.body;
     
    body.appendChild(vote[0]);
    
    
    //var vote_divs = jQuery('div.vote');
    //for (var i = 0; i < vote_divs.length; i++) {
    //  vote_divs[i].style.display = "none";
    //}
    
    
    if (show)
    {
      vote.css('display', "block");
    }
    else
    {
      vote.css('display', "none");
    }    
 
    
    
    vote.css({ position: 'absolute', zIndex: '9999'});
    
    var left_pos = button.offset().left - vote.getWidth() ;
    var top_pos = button.offset().top  ;
    
    vote.css('top', top_pos + "px");
    vote.css('left', left_pos + "px");
   
    //vote.show();
  
  }
  
  function showFinalizer(button_node, vote_node, show)
  {
 
    var button = jQuery(button_node);
    var vote = jQuery(vote_node);
    
    
        
    var body = document.body;
    
    
    body.appendChild(vote[0]);
    
    if (show)
    {
      vote.css('display', "block");
    }
    else
    {
      vote.css('display', "none");
    }    
 
    
    
    vote.css({ position: 'absolute', zIndex: '9999'});
    
    var left_pos = button.offset().left + button.getWidth() - vote.getWidth() ;
    //var left_pos = button.cumulativeOffset().left - vote.getWidth() ;
    var top_pos = button.offset().top  ;
    
    vote.css('top', top_pos + "px");
    vote.css('left', left_pos + "px");
   
    //vote.show();
  
  }
  
  function toggleFinalizer(button_node, finalizer_node)
  {
 
    var button = jQuery(button_node);
    var finalizer = jQuery(finalizer_node);
    
    
        
    var body = document.body;
    
    
    body.appendChild(finalizer[0]);
    
 
 
    var show_div = true;
    if (finalizer.css('display') == "block")
    {
      show_div = false;
    }
  
 
    var finalizings = jQuery('div.finalizing');
    for (var i = 0; i < finalizings.length; i++) {
      finalizings[i].style.display = "none";
    }
    
    if (show_div) {
      finalizer.css('display', "block");
    }
    
 
    
    
    finalizer.css({ position: 'absolute', zIndex: '9999'});
    
    var left_pos = button.offset().left - finalizer.getWidth() ;
    var top_pos = button.offset().top  ;
    
    finalizer.css('top', top_pos + "px");
    finalizer.css('left', left_pos + "px");
   
    
  
  }  