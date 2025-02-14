const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000; // Railway define a porta automaticamente

app.use(cors());
app.use(express.json());

app.get("/receber", (req, res) => {
    res.json({ mensagem: "API funcionando!" });
});

app.listen(PORT, () => {
    console.log(`🔥 Servidor rodando na porta ${PORT}`);
});
