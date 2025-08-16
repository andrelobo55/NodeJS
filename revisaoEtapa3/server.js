const agentesRoutes = require('./routes/agentesRoutes');
const casosRoutes = require('./casos/casosRoutes');
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/agentes", agentesRoutes);
app.use("/casos", casosRoutes);

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(err.statusCode || 500).json( {
        message: err.message || "Erro interno no servidor"
    });
});

app.listen(PORT, () => {
    console.log(`Servidor do Departamento de Polícia hospedado em: http://localhost:${PORT}`);
});