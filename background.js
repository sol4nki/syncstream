// current title and link update wala part (ye sab just display ke liye nothing special)

// <div class="videoContainer" id="videoInfo">
//     <p class="videoName">YouTube Video</p>
//     <p class="videoLink">https://youtube.com/watch?v=example</p>
// </div>

console.log("running");

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (tabs && tabs.length > 0) {
    let currentTab = tabs[0];
    let pageTitle = currentTab.title;
    let pageLink = currentTab.url;
    console.log("Page Title:", pageTitle);
    console.log("Page Link:", pageLink);
    // i <3 stackoverflow
   }
});