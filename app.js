// const express =  require ("express");
// const router = require ("./src/routes/tarefasRouter.js");

// const app = express();
// router(app);

// module.exports = app

const express = require('express');
const cors = require('cors')
const tarefasRouter = require('./src/routes/tarefasRouter.js');

const app = express();

app.use(cors());
// Middleware para parsing JSON
app.use(express.json());

// Use o router corretamente
app.use('/api', tarefasRouter); // ou app.use(tarefasRouter) se quiser na raiz

module.exports = app;