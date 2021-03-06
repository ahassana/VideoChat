const constraints = {video: true, audio: true};
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.mediaDevices.getUserMedia;

navigator.getUserMedia(constraints, success ,error);
function success (stream) { 

var peer = require("simple-peer");
var peer = new peer({
    initiator: location.hash === '#init',
    trickle: false,
    stream: stream
});

peer.on('signal', (data)=>{
    document.getElementById('yourId').value = JSON.stringify(data)
})

document.getElementById('connect').addEventListener('click', function () {
    var otherId = JSON.parse(document.getElementById('otherId').value)
    peer.signal(otherId)
})

document.getElementById('send').addEventListener('click', function () {
   var yourMessage = document.getElementById('yourMessage').value
   peer.send(yourMessage)
})

peer.on('data', (data)=> {
    document.getElementById('messages').textContent += data + '\n'
})

peer.on('stream', (stream)=> {
    
    var video = document.getElementById('video')
    video.srcObject = stream
    video.play()
})

};
function error (error) {
    console.log("navigator.getUserMedia error: ", error);
};