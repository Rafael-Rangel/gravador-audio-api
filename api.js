const express = require("express");
const app = express();

app.use(express.json());

app.post("/receber", (req, res) => {
    console.log("Áudio recebido:", req.body.audio);
    
    // Simula o processamento do áudio e retorna uma mensagem corrigida
    setTimeout(() => {
        res.json({ mensagem: "Aqui está a mensagem corrigida!" });
    }, 3000);
});

app.listen(3001, () => console.log("API rodando na porta 3001"));
