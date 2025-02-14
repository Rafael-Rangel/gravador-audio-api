let gravando = false;
let mediaRecorder;
let audioChunks = [];

document.getElementById("gravar").addEventListener("click", async () => {
    if (!gravando) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        
        mediaRecorder.ondataavailable = event => {
            audioChunks.push(event.data);
        };
        
        mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
            const audioURL = URL.createObjectURL(audioBlob);
            
            // Criar link para download
            document.getElementById("notas").value = audioURL;
        };
        
        mediaRecorder.start();
        document.getElementById("status").textContent = "Gravando...";
        gravando = true;
    } else {
        mediaRecorder.stop();
        document.getElementById("status").textContent = "Gravação finalizada!";
        gravando = false;
    }
});

// Enviar link para o Webhook
document.getElementById("enviar").addEventListener("click", async () => {
    const audioLink = document.getElementById("notas").value;
    const webhookURL = "https://seu-webhook.com/receber";  // Mude para o seu webhook real

    if (!audioLink) {
        alert("Nenhum link gerado!");
        return;
    }

    const payload = { audio: audioLink };

    try {
        const response = await fetch(webhookURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert("Link enviado com sucesso!");
        } else {
            alert("Erro ao enviar o link!");
        }
    } catch (error) {
        alert("Falha na conexão com o Webhook.");
        console.error(error);
    }
});

// Receber a mensagem corrigida da API
async function receberMensagemCorrigida() {
    const response = await fetch("https://sua-api.com/corrigir-mensagem");  // Mude para sua API real
    const data = await response.json();
    
    if (data.mensagem) {
        document.getElementById("final").value = data.mensagem;
    }
}

// Chamar automaticamente a API depois de enviar o áudio
document.getElementById("enviar").addEventListener("click", () => {
    setTimeout(receberMensagemCorrigida, 5000);  // Espera 5s e pega a resposta
});
