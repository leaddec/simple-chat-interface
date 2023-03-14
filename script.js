const chatHistory = document.getElementById('chat-history');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

const API_KEY = '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';
const API_ENDPOINT = 'https://api.openai.com/v1/engines/davinci-codex/completions';

sendBtn.addEventListener('click', async () => {
    const message = userInput.value.trim();
    if (message === '') return;

    userInput.value = '';
    addMessageToChat('user', message);
    const response = await sendRequestToChatGPT(message);
    addMessageToChat('gpt', response);
});

function addMessageToChat(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'gpt-message');
    messageElement.textContent = message;
    chatHistory.appendChild(messageElement);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

async function sendRequestToChatGPT(message) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            'input': message
        })
    };

    try {
        const response = await fetch(API_ENDPOINT, requestOptions);
        const data = await response.json();
        return data.output || 'Error: The ChatGPT API did not return a valid response.';
    } catch (error) {
        console.error('Error fetching ChatGPT response:', error);
        return 'Error: Unable to fetch ChatGPT response.';
    }
}
