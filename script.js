function toggleChat() {
    var chatBox = document.getElementById('chat-box');
    chatBox.style.display = (chatBox.style.display === 'block') ? 'none' : 'block';
}


function sendMessage() {
    var userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== "") {
        
        displayMessage(userInput, "user");

        
        setTimeout(() => {
            var botResponse = getBotResponse(userInput);  
            displayMessage(botResponse, "bot");
        }, 1000);

        
        document.getElementById('user-input').value = "";
    }
}


function displayMessage(message, sender) {
    var chatContent = document.getElementById('chat-content');
    var msgDiv = document.createElement('div');
    msgDiv.classList.add(sender === "user" ? "user-msg" : "bot-msg");
    msgDiv.textContent = message;
    chatContent.appendChild(msgDiv);

    
    chatContent.scrollTop = chatContent.scrollHeight;
}


async function getBotResponse(userInput) {
    if (userInput.toLowerCase().includes("shipment")) {
        try {
            const response = await fetch('https://air-cargo-schedule-and-rate.p.rapidapi.com/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                'x-rapidapi-host': 'air-cargo-schedule-and-rate.p.rapidapi.com',
                'x-rapidapi-key': '193fec91bemshcac54451ce1fb55p161498jsn6fd1e26f117c' 
                },
                body: JSON.stringify({
                    
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log("API Data:", data); 
                return `Here is the shipment information: ${JSON.stringify(data)}`; 
            } else {
                console.error("API error:", response.status, response.statusText);
                return "I'm unable to retrieve shipment data at the moment.";
            }
        } catch (error) {
            console.error("Fetch error:", error);
            return "There was an error while trying to get the shipment data. Please try again later.";
        }
    } else if (userInput.toLowerCase().includes("hello") || userInput.toLowerCase().includes("hi")) {
        return "Hi! How can I help you today?";
    } else {
        return "I'm sorry, I didn't understand that. Can you rephrase?";
    }
}


async function sendMessage() {
    var userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== "") {
        displayMessage(userInput, "user");

       
        document.getElementById('user-input').value = "";

        
        var typingIndicator = document.createElement('div');
        typingIndicator.classList.add("bot-msg", "typing");
        typingIndicator.textContent = "Bot is typing...";
        document.getElementById('chat-content').appendChild(typingIndicator);
        
        
        document.getElementById('chat-content').scrollTop = document.getElementById('chat-content').scrollHeight;

        try {
            const botResponse = await getBotResponse(userInput);

            
            if (typingIndicator) {
                typingIndicator.remove();
            }

            displayMessage(botResponse, "bot");
        } catch (error) {
            console.error("Error in sendMessage:", error);
            if (typingIndicator) {
                typingIndicator.remove();
            }
            displayMessage("An error occurred. Please try again later.", "bot");
        }
    }
}

function displayMessage(message, sender) {
    var chatContent = document.getElementById('chat-content');
    var msgDiv = document.createElement('div');
    msgDiv.classList.add(sender === "user" ? "user-msg" : "bot-msg");
    msgDiv.textContent = message;
    chatContent.appendChild(msgDiv);

    
    chatContent.scrollTop = chatContent.scrollHeight;
}


document.getElementById('user-input').addEventListener('keypress', function(event) {
    
    if (event.key === 'Enter') {
        event.preventDefault(); 
        sendMessage(); 
    }
});

window.onload = () => {
    const chatbotIcon = document.getElementById('chat-btn');
    chatbotIcon.style.animation = 'rocket-flight 1.5s 1 forwards'; 
    
  };
  
  




