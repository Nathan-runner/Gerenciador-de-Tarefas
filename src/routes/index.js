const express = require ("express");
const tarefas = require ("./tarefasRouter.js");


module.exports = app => {
    app.use(
        express.json,
        tarefas
    );
};