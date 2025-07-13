class SyncStream {
    constructor() {
        this.peers = new Map();
        this.isHost = false;
        this.roomId = null;
        this.currentVideo = null;
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.detectVideo();
        this.startVideoDetection();
    }
    
    setupEventListeners() {
        
        document.getElementById('createRoomBtn').addEventListener('click', () => this.createRoom());
        document.getElementById('joinRoomBtn').addEventListener('click', () => this.joinRoom());
        
        document.getElementById('syncBtn').addEventListener('click', () => this.syncVideo());
        document.getElementById('leaveBtn').addEventListener('click', () => this.leaveRoom());
    }
    
    generateRoomId() {
        return Math.random().toString(36).substr(2, 8).toUpperCase();
    }
    
    createRoom() {
        this.roomId = this.generateRoomId();
        this.isHost = true;
        this.showRoomSection();
        this.updateStatus('Room created - waiting for peers');
        this.simulatePeerConnection();
    }
    
    joinRoom() {
        const roomId = document.getElementById('roomIdInput').value.trim();
        if (!roomId) {
            alert('Please enter a room ID');
            return;
        }
        
        this.roomId = roomId;
        this.isHost = false;
        this.showRoomSection();
        this.updateStatus('Connecting to room...');
        this.connectToRoom();
    }
    
    showRoomSection() {
        document.getElementById('setupSection').style.display = 'none';
        document.getElementById('roomSection').style.display = 'block';
        document.getElementById('roomId').textContent = this.roomId;
    }
    
    showSetupSection() {
        document.getElementById('setupSection').style.display = 'block';
        document.getElementById('roomSection').style.display = 'none';
        document.getElementById('roomIdInput').value = '';
    }
    
    updateStatus(status) {
        document.getElementById('statusText').textContent = ' • ' + status;
    }
    
    connectToRoom() {
        
        setTimeout(() => {
            this.updateStatus('Connected to room');
            this.simulatePeerConnection();
        }, 1000);
    }
    
    simulatePeerConnection() {
        
        setTimeout(() => {
            this.addPeer('User_' + Math.random().toString(36).substr(2, 4));
            this.updatePeerCount();
        }, 2000);
        
        setTimeout(() => {
            this.addPeer('User_' + Math.random().toString(36).substr(2, 4));
            this.updatePeerCount();
        }, 4000);
    }
    
    addPeer(peerId) {
        this.peers.set(peerId, { id: peerId, connected: true });
        this.renderPeers();
    }
    
    removePeer(peerId) {
        this.peers.delete(peerId);
        this.renderPeers();
    }
    
    renderPeers() {
        const peersList = document.getElementById('peersList');
        peersList.innerHTML = '';
        
        this.peers.forEach(peer => {
            const peerEl = document.createElement('div');
            peerEl.className = 'userContainer';
            peerEl.innerHTML = `<p> • ${peer.id}</p>`;
            peersList.appendChild(peerEl);
        });
    }
    
    updatePeerCount() {
        document.getElementById('peerCount').textContent = this.peers.size;
    }
    
    detectVideo() {
        
        const commonVideoSites = [
            { title: 'YouTube Video', url: 'https://youtube.com/watch?v=example' },
            { title: 'Netflix Movie', url: 'https://netflix.com/watch/example' },
            { title: 'Vimeo Video', url: 'https://vimeo.com/example' }
        ];
        
        const randomVideo = commonVideoSites[Math.floor(Math.random() * commonVideoSites.length)];
        this.currentVideo = randomVideo;
        this.updateVideoInfo();
    }
    
    startVideoDetection() {
       
        setInterval(() => {
            if (Math.random() > 0.7) {
                this.detectVideo();
            }
        }, 10000);
    }
    
    updateVideoInfo() {
        const videoInfo = document.getElementById('videoInfo');
        if (this.currentVideo) {
            videoInfo.innerHTML = `
                <p class="videoName">${this.currentVideo.title}</p>
                <p class="videoLink">${this.currentVideo.url}</p>
            `;
        } else {
            videoInfo.innerHTML = `
                <p class="videoName">No video detected</p>
                <p class="videoLink">Navigate to a video page to start syncing</p>
            `;
        }
    }
    
    syncVideo() {
        if (!this.currentVideo) {
            this.updateStatus('No video to sync');
            return;
        }
        
        this.updateStatus('Syncing video...');
        
       
        setTimeout(() => {
            this.updateStatus(`Synced with ${this.peers.size} peers`);
            this.broadcastSync();
        }, 1000);
    }
    
    broadcastSync() {
       
        this.peers.forEach(peer => {
            console.log(`Sending sync data to ${peer.id}`);
        });
    }
    
    leaveRoom() {
        this.peers.clear();
        this.roomId = null;
        this.isHost = false;
        this.currentVideo = null;
        
        this.showSetupSection();
        this.updateStatus('Ready to connect');
        this.updatePeerCount();
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const syncStream = new SyncStream();
});

