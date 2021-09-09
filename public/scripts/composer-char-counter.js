$(document).ready(function() {

  const maxChar = parseInt($('.counter').text(), 10);

  $(".new-tweet textarea").on("input", function(event) {  
    const charNum = maxChar - this.textLength;    
    // $(".counter", ".new-tweet").text(display);
    $(".counter", $(this).parent()).text(charNum);

    if (charNum < 0) {
      $(".counter", $(this).parent()).addClass('overlimit');
    } else {
      $(".counter", $(this).parent()).removeClass('overlimit');
    }    
  });
});
