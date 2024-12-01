// script.js
function generateThought() {
    const object = document.getElementById('object').value;
    const thinker = document.getElementById('thinker').value;
    const tabooMode = document.getElementById('tabooMode').checked;

    // Construct API request payload
    const payload = {
        object,
        thinker,
        tabooMode
    };

    // Mock response from the API
    const response = {
        audioUrl: 'path_to_mp3_from_api',
        text: 'Generated thought text from the API'
    };

    // Assuming the API response has been handled and we got the response
    const audioPlayer = document.getElementById('audioPlayer');
    const downloadLink = document.getElementById('downloadLink');
    const thoughtText = document.getElementById('thoughtText');

    audioPlayer.src = response.audioUrl;
    audioPlayer.hidden = false;

    downloadLink.href = response.audioUrl;
    downloadLink.hidden = false;

    thoughtText.textContent = response.text;
}

function toggleText() {
    const thoughtText = document.getElementById('thoughtText');
    thoughtText.hidden = !thoughtText.hidden;
}