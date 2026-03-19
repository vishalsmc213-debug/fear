// Code Fixer-ஐ Backend உடன் இணைக்க:
async function fixCode() {
    const codeArea = document.querySelector('textarea').value;
    const status = document.getElementById('fixStatus');

    try {
        const response = await fetch('http://localhost:5000/api/fix-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: codeArea })
        });
        const data = await response.json();
        document.querySelector('textarea').value = data.fixedCode;
        status.innerText = "✔ AI has fixed your code!";
    } catch (err) {
        status.innerText = "Error connecting to AI Server.";
    }
}
