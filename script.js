const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loading
function hideLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote Asynchronously
async function getQuote() {
  showLoadingSpinner();
  const proxyAPI = "https://cors-anywhere.herokuapp.com/";
  const apiURL =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  try {
    const response = await fetch(proxyAPI + apiURL);
    const data = await response.json();
    // IF author is blaank, add 'Unknown'
    if (data.quoteAuthor === "") {
      authorText.innerText = "UnKnown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    // reduce font size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;
    // Stop Loader, show quote
    hideLoadingSpinner();
  } catch (error) {
    //   In Case of API Failure - Call again
    getQuote();
    console.log("Something went wrong !", error);
  }
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterURL, "_blank");
}

// Event Listeners
// New Quote
newQuoteBtn.addEventListener("click", getQuote);
// Tweet Quote
twitterBtn.addEventListener("click", tweetQuote);

// PageLoad
getQuote();
