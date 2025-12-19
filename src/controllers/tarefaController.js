const database = require("../models");

class TarefaController {
  
  async pegaTodasAsTarefas(req, res) {
    try {
      const listaDeTarefas = await database.Tarefa.findAll();
      return res.status(200).json(listaDeTarefas);
    } catch (erro) {
      return res.status(500).json({ mensagem: "Erro interno ao buscar tarefas", erro: erro.message });
    }
  }

  async pegaTarefaPorId(req, res) {
    const { id } = req.params;
    try {
      const umaTarefa = await database.Tarefa.findByPk(id);
      if (!umaTarefa) {
        return res.status(404).json({ mensagem: `Tarefa com ID ${id} não encontrada` });
      }
      return res.status(200).json(umaTarefa);
    } catch (erro) {
      return res.status(500).json({ mensagem: "Erro ao buscar tarefa", erro: erro.message });
    }
  }
r
  async criaNovaTarefa(req, res) {
    const dadosParaCriacao = req.body;
    try {
      if (Object.keys(dadosParaCriacao).length === 0) {
        return res.status(400).json({ mensagem: "Corpo da requisição vazio" });
      }
      const novoRegistroCriado = await database.Tarefa.create(dadosParaCriacao);
      return res.status(201).json(novoRegistroCriado);
    } catch (erro) {
      return res.status(400).json({ mensagem: "Erro ao criar tarefa. Verifique os dados enviados.", erro: erro.message });
    }
  }

  async atualizaTarefa(req, res) {
    const { id } = req.params;
    const dadosAtualizados = req.body;
    try {
      const [foiAtualizado] = await database.Tarefa.update(dadosAtualizados, {
        where: { id: Number(id) }
      });

      if (foiAtualizado === 0) {
        return res.status(404).json({ mensagem: "Registro não encontrado para atualização ou nenhum dado alterado" });
      }

      return res.status(200).json({ mensagem: "Atualizado com sucesso" });
    } catch (erro) {
      return res.status(500).json({ mensagem: "Erro ao atualizar tarefa", erro: erro.message });
    }
  }

  async excluiTarefa(req, res) {
    const { id } = req.params;
    try {
      const tarefaExiste = await database.Tarefa.findByPk(id);
      if (!tarefaExiste) {
        return res.status(404).json({ mensagem: `ID ${id} não encontrado` });
      }

      await database.Tarefa.destroy({ where: { id: Number(id) } });
      return res.status(200).json({ mensagem: `ID ${id} deletado com sucesso` });
    } catch (erro) {
      return res.status(500).json({ mensagem: "Erro ao excluir tarefa", erro: erro.message });
    }
  }
}

module.exports = new TarefaController();
//const controller = new tarefaController();
//module.exports = controller