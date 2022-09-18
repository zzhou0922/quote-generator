const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading
function loading() {
    // Hidden attribute is actually on any HTML element. 
    // You can use it for anything.
    // In this case, we're hiding our div
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote
function newQuote() {
    loading();
    // Pick a ramdom quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // Chekc if Author field is blank and replace it with 'Unknown'.
    if(!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    
    // Check Quote length to determine styling
    if(quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader.
    quoteText.textContent = quote.text; 
    complete();
}

// Get Quote from API
async function getQuotes() {
    loading();
    // Use const if value is never changing, like the API URL below. 
    // In the other hand, let varaible are used for variable that its content may be changing later on in the code.
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error Here
    }
}

// Tweer Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank'); // the _blank is going to allow that window to open Twitter in a new tab.
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load 
getQuotes();