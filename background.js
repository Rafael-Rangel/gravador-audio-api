chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "enviar_webhook") {
        fetch("https://seu-webhook.com/receber", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ audio: message.audio })
        })
        .then(response => response.json())
        .then(data => sendResponse({ sucesso: true, resposta: data }))
        .catch(error => sendResponse({ sucesso: false, erro: error }));

        return true;  // Mantém a conexão aberta até que a resposta chegue
    }
});
