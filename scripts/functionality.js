class syncsender{
    constructor(){
        this.lc = new RTCPeerConnection();
        this.dc = new this.lc.createDataChannel();
    }

    update(){
        // cureent video time dalna and +- 3 sec ka change ho sakta 
        // aagar more than that then update video player wala 
        const video = document.querySelector('video');
        const updates = {
            currentTime: video.currentTime,
            paused: video.paused
        };
        return updates;
    }

    send(updates){
        this.dc.send(JSON.stringify(updates));
    }
}

class syncreceiver{
    constructor(){
        this.lc = new RTCPeerConnection();
        
        // receive wala cause just check dc for update
        this.dc.onmessage = (event) => {
            const updates = JSON.parse(event.data);
            this.receive(updates);
        };
    }

    receive(updates){
        const video = document.querySelector('video');
        if (Math.abs(updates.currentTime - video.currentTime) > 5) {
            video.currentTime = updates.currentTime;

            if (updates.paused) {
                video.pause();
            }
        }
    }
}


let classstate = null
let connectionstate = false

setTimeout(() => {
    if (connectionstate) {
        
        
    }
}, 1000);

document.getElementById('leaveBtn').addEventListener('click', () => {
    try{
        // this.dc.close()
        // this.lc.close()
    } catch (error) {
        console.error("Error closing connections:", error)
    }
    document.getElementById('setupSection').style.display = 'block'
    document.getElementById('roomSection').style.display = 'none'
    classstate = null
})

document.getElementById('joinRoomBtn').addEventListener('click', () => {
    if (connectionstate && classstate) {
        document.getElementById('setupSection').style.display = 'none'
        document.getElementById('roomSection').style.display = 'block'
        // classstate = new syncreceiver()
        // console.log(classstate)
    } else {
        alert("Please connect to a room first")
    }
});

document.getElementById('createRoomBtn').addEventListener('click', () => {
    console.log("clicked")
    document.getElementById('setupSection').style.display = 'none'
    document.getElementById('roomSection').style.display = 'block'
    // classstate = new syncsender()
    // console.log(classstate)
})

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (tabs && tabs.length > 0) {
    let currentTab = tabs[0];
    let pageTitle = currentTab.title;
    let pageLink = currentTab.url;
    console.log("Page Title1:", pageTitle);
    console.log("Page Link1:", pageLink);
    // i <3 stackoverflow
   }
});