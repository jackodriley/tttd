// Handles showing the additional text input when 'Other...' is selected
function showOtherField() {
    const select = document.getElementById('object');
    const otherInput = document.getElementById('otherObject');
    otherInput.hidden = select.value !== 'other'; // Show input if 'Other...' is selected
}

// Called when the 'Generate Thought' button is clicked
function generateThought() {
    const object = document.getElementById('object').value === 'other' ? 
                   document.getElementById('otherObject').value : 
                   document.getElementById('object').value;
    const thinker = document.getElementById('thinker').value;
    const tabooMode = document.getElementById('tabooMode').checked;

    // Here you would construct the payload and make the API request to your Firebase function
    // Mockup of the API payload
    const payload = {
        object: object,
        thinker: thinker,
        tabooMode: tabooMode
    };

    // Simulated API response
    const response = {
        audioUrl: 'path_to_audio_file_from_api.mp3',
        text: 'Generated thought text from the API'
    };

    // Handling the response
    const audioPlayer = document.getElementById('audioPlayer');
    const downloadLink = document.getElementById('downloadLink');
    const thoughtText = document.getElementById('thoughtText');

    // Update the audio player and download link
    audioPlayer.src = response.audioUrl;
    audioPlayer.hidden = false;
    downloadLink.href = response.audioUrl;
    downloadLink.hidden = false;

    // Store the thought text and keep it hidden until 'Show Text' is clicked
    thoughtText.textContent = response.text;
}

// Toggles the visibility of the generated thought text
function toggleText() {
    const thoughtText = document.getElementById('thoughtText');
    thoughtText.hidden = !thoughtText.hidden; // Toggle the visibility of the text
}

// It's important to test each function to ensure they're working correctly in the browser.
// Check for console errors and ensure that the API integration works once added.