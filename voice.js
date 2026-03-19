function startVoice() {
    const recordBtn = document.getElementById('recordBtn');
    const status = document.getElementById('voiceStatus');
    const queryDisplay = document.getElementById('userQuery');

    // Browser Support செக் செய்தல்
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (window.SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'ta-IN'; // தமிழ் மற்றும் ஆங்கிலம் இரண்டையும் ஆதரிக்கும்
        
        recognition.onstart = () => {
            recordBtn.classList.add('recording');
            status.innerText = "கேட்டுக் கொண்டிருக்கிறேன்...";
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            queryDisplay.innerText = "நீங்கள் கேட்டது: " + transcript;
            
            // இங்கே நீங்கள் AI-க்கு இந்த உரையை அனுப்பி பதில் பெறலாம்
            setTimeout(() => {
                alert("AI Response: உங்கள் கேள்விக்கான பதில் தேடப்படுகிறது...");
            }, 1000);
        };

        recognition.onspeechend = () => {
            recognition.stop();
            recordBtn.classList.remove('recording');
            status.innerText = "கேள்வி கேட்க மைக் பட்டனை அழுத்தவும்...";
        };

        recognition.onerror = () => {
            status.innerText = "மன்னிக்கவும், பிழை ஏற்பட்டுள்ளது.";
            recordBtn.classList.remove('recording');
        };

        recognition.start();
    } else {
        alert("உங்கள் பிரவுசர் Voice Recognition-ஐ ஆதரிக்கவில்லை.");
    }
}
