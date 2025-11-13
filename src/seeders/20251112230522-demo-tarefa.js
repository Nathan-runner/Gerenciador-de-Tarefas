'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tarefas', [
  {
    descricao: "Configurar o ambiente Node.js e instalar dependências (Express, SQLite).",
    concluida: false,
    prioridade: "Alta",
    dataLimite: new Date("2025-11-15T23:59:59").toISOString(),
    createdAt: new Date("2025-11-10T09:00:00").toISOString(),
    updatedAt: new Date()
  },
  {
    descricao: "Implementar endpoint POST /tasks para criação de nova tarefa.",
    concluida: true,
    prioridade: "Alta",
    dataLimite: new Date("2025-11-11T18:00:00").toISOString(),
    createdAt: new Date("2025-11-10T11:30:00").toISOString(),
    updatedAt: new Date()
  },
  {
    descricao: "Escrever documentação básica para a API (README.md).",
    concluida: false,
    prioridade: "Média",
    dataLimite: null, // Sem data limite específica
    createdAt: new Date("2025-11-11T08:45:00").toISOString(),
    updatedAt: new Date()
  },
  {
    descricao: "Refatorar o código da classe Tarefa para usar camelCase.",
    concluida: true,
    prioridade: "Média",
    dataLimite: new Date("2025-11-10T12:00:00").toISOString(),
    createdAt: new Date("2025-11-09T14:20:00").toISOString(),
    updatedAt: new Date()
  },
  {
    descricao: "Testar a funcionalidade de marcação de tarefa como concluída (PUT /tasks/:id).",
    concluida: false,
    prioridade: "Alta",
    dataLimite: new Date("2025-11-12T17:00:00").toISOString(),
    createdAt: new Date("2025-11-12T07:10:00").toISOString(),
    updatedAt: new Date()
  },
  {
    descricao: "Pesquisar alternativas de ORM para SQLite (Ex: Sequelize ou Knex).",
    concluida: false,
    prioridade: "Baixa",
    dataLimite: null,
    createdAt: new Date("2025-11-08T16:00:00").toISOString(),
    updatedAt: new Date()
    
  }
] , {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tarefas', null, {});
  }
};
