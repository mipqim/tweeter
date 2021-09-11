/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
    <p class="tweet-msg">${tweet.content.text}</p>
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

 const pageInit = function(){
  $('#tweets-container').empty();   
  $('#tweet-text').val('');   
  $('#new-tweet-form .counter').text('140');
 }

 const loadTweets = function(){
  $.get('http://localhost:8080/tweets', (data) => {
    pageInit();    
    renderTweets(data.reverse());
  });
 }

 $(document).ready(() => {  

  loadTweets();

  $('#new-tweet-form').submit((event) => {
    event.preventDefault();

    $.post('http://localhost:8080/tweets', $('#new-tweet-form').serialize(), (err, data) => {
      if(!err) {
        loadTweets();
      }
    });
  });



});