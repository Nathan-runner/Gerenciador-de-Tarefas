const database = require("../models")


class tarefaController {
    
    static async pegaTodasAsTarefas (req, res) {
        try {
            const listaDeTarefas = await database.tarefas.findAll()
            res.status(200).json(listaDeTarefas);
        }
        catch (erro) {
            res.status(500).json({ mensagem: "Erro ao buscar tarefas", erro });
        }
    };
     async pegaTarefaPorId(req, res) {
     const { id } = req.params;
     try {
       const umRegistro = await database.tarefas.findByPk(id);
       return res.status(200).json(umRegistro);
     } catch (erro) {
        //erro
     }
   }

   async criaNovaTarefa(req, res) {
     const dadosParaCriacao = req.body;
     try {
       const novoRegistroCriado = await database.tarefas.create(dadosParaCriacao);
       return res.status(201).json(novoRegistroCriado);
     } catch (erro) {
       // erro
     }
   }

  async atualizaTarefa(req, res) {
    const {id} = req.params;
    const  dadosAtualizados = req.body;
    
    try {
      //is update
      const foiAtualizado = await database.tarefas.update(dadosAtualizados, {
      where: { id: id }});
      if (!foiAtualizado) {
        return res.status(400).json({message: 'registro não foi atualizado'});
      }
      return res.status(200).json({message: 'Atualizado com sucesso'});
    }
    catch (erro) {
    //erro
    }
  }
   async excluiTarefa(req, res) {
     const { id } = req.params;
     try {
       await database.tarefas.destroy( {where: { id: id }});
       return res.status(200).json({ mensagem: `id ${id} deletado` });

     } catch (error) {
       return res.status(500).json(error.message);
     }
   }
}

const controller = new tarefaController();
module.exports = controller