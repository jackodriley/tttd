// Handles showing the additional text input when 'Other...' is selected
function showOtherField() {
    const select = document.getElementById('object');
    const otherInput = document.getElementById('otherObject');
    otherInput.hidden = select.value !== 'other'; // Show input if 'Other...' is selected
}

// Called when the 'Generate Thought' button is clicked
async function generateThought() {
    const objectSelect = document.getElementById('object');
    let object = objectSelect.value;
    if (object === 'other') {
      object = document.getElementById('otherObject').value.trim() || 'an object';
    }
  
    const thinker = document.getElementById('thinker').value;
    const tabooMode = document.getElementById('tabooMode').checked;
  
    // Map the chosen thinker to the correct phrase
    let thinkerPhrase = '';
    switch (thinker) {
      case 'Vicar':
        thinkerPhrase = 'an eminent English vicar';
        break;
      case 'Bishop':
        thinkerPhrase = 'an elderly Bishop';
        break;
      case 'Rabbi':
        thinkerPhrase = 'an eminent rabbi';
        break;
      case 'Humanist':
        thinkerPhrase = 'a trendy Humanist thinker';
        break;
      default:
        thinkerPhrase = 'an eminent English vicar';
    }
  
    const tabooInstruction = tabooMode
      ? '[THE COMPOSITION SHOULD GROW INCREASINGLY UNHINGED AND END WITH ESSENTIALLY NONSENSICAL GARBAGE]'
      : '';
  
    const prompt =
      `PROMPT: "Write a ‘Thought for the Day’ in the style of BBC Radio 4, ` +
      `in the voice of ${thinkerPhrase}. The piece should be 250-350 words and begin ` +
      `with an observation about an (imaginary) personal anecdote involving ${object}, ` +
      `ideally proceeding from some humdrum detail about ordinary life. Expand into a ` +
      `moral and spiritual reflection, incorporating a balance of Christian teachings and ` +
      `relatable insights. Begin with Good Morning and Conclude with a glib, hopeful or ` +
      `thought-provoking takeaway for the audience. Maintain a reflective, inclusive, and ` +
      `eloquent tone throughout. ${tabooInstruction}"`;
  
    console.log("Constructed prompt:", prompt); // Debugging log
  
    try {
      const response = await fetch('https://us-central1-tttd-a18ee.cloudfunctions.net/generateThought', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }), // Send the constructed prompt directly
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Request failed');
      }
  
      const data = await response.json();
  
      // Update the UI with the generated text
      const thoughtText = document.getElementById('thoughtText');
      thoughtText.textContent = data.text;
      thoughtText.hidden = false;
  
      // Hide audio and download link since they're not used now
      document.getElementById('audioPlayer').hidden = true;
      document.getElementById('downloadLink').hidden = true;
    } catch (error) {
      console.error('Error:', error); // Log errors to console
      alert('An error occurred: ' + error.message); // Alert user to the error
    }
  }

// Toggles the visibility of the generated thought text
function toggleText() {
    const thoughtText = document.getElementById('thoughtText');
    thoughtText.hidden = !thoughtText.hidden; // Toggle the visibility of the text
}

// It's important to test each function to ensure they're working correctly in the browser.
// Check for console errors and ensure that the API integration works once added.