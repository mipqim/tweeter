/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  for(const tweetDate of tweets) {
    $('#tweets-container').append(createTweetElement(tweetDate));
  }
  console.log($('#tweets-container'));
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

$(document).ready(() => {  
  renderTweets(data);
});