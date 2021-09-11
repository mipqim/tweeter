const renderTweets = function(tweets) {
  for(const tweetDate of tweets) {
    $('#tweets-container').append(createTweetElement(tweetDate));
  }
}

const createTweetElement = function(tweet) {
  const tweetHtml = `
  <div class="tweet-individual-container"> 
    <header class="tweet-header">
      <div>
        <div class="tweet-usrimg">
          <img src="${tweet.user.avatars}"/>
        </div>
        <span>${tweet.user.name}</span>
     </div>
      <span class="tweet-userid">${tweet.user.handle}</span>
    </header>
    <p class="tweet-msg">${escape(tweet.content.text)}</p>
    <footer class="tweet-footer">
      <span>${timeago.format(tweet.created_at)}</span>
      <div>
        <a href=""><div><i class="fas fa-flag"></i></div></a>
        <a href=""><div><i class="fas fa-retweet"></i></div></a>
        <a href=""><div><i class="fas fa-heart"></i></div></a>
      </div>
    </footer>
  </div>  
  `;

  return tweetHtml;
  }

  const escape = (str) => {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const pageInit = function() {
    $('#tweets-container').empty();   
    $('#tweet-text').val('');   
    $('#new-tweet-form .counter').text('140');
    hideError();
  }

  const hideError = function() {
    $('.new-tweet .error-message').hide();
    $('.new-tweet .error-message > span').text('');
  }

 const loadTweets = function(){
  $.get('http://localhost:8080/tweets', (data) => {
    pageInit();    
    renderTweets(data.reverse());
  });
 }

 function showErrorMessage(message) {
  hideError();
  $('.new-tweet .error-message').slideDown('fast', () => {
    $('.new-tweet .error-message > span').text(message);
  });
}

 $(document).ready(() => {  

  loadTweets();

  $('#new-tweet-form').submit((event) => {
    event.preventDefault();

    const charsNum = $('#tweet-text').val().length;
    if (charsNum > 140) {
      showErrorMessage('Too long. The limit of chars is 140.');
      return;
    } else if (charsNum === 0) {
      showErrorMessage('Tweet is empty');
      return;
    }

    $.post('http://localhost:8080/tweets', $('#new-tweet-form').serialize(), (err, data) => {
      if(!err) {
        loadTweets();
      }
    });
  });

  $('#toggle-new-tweet').click((event) => {
    $('.new-tweet').slideToggle(300, () => {
      if ($(".new-tweet").is(":visible")) {
        $('#tweet-text').focus(); 
        $('#toggle-new-tweet > span').css({ "margin-bottom" : "0.8em"});        
      } else {
        $('#toggle-new-tweet > span').css({ "margin-bottom" : "0em"});
      }
    });
  });

  $(window).scroll(function() {
      if ($(this).scrollTop() > 500) {
          $('#move-to-top').fadeIn();
      } else {
          $('#move-to-top').fadeOut();
      }
  });
   
  $("#move-to-top").click(function() {
      $('html, body').animate({
          scrollTop : 0
      }, 400);
      return false;
  });
});