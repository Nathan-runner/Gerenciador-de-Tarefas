const {Router} = require ("express");
const controller = require ("../controllers/tarefaController.js");

const router = Router();


router.get("/tarefas",(req, res) => controller.pegaTodasAsTarefas(req, res));
router.get('/tarefas/:id', (req, res) => controller.pegaTarefaPorId(req, res));
router.post('/tarefas', (req, res) => controller.criaNovaTarefa(req, res));
router.put('/tarefas/:id', (req, res) => controller.atualizaTarefa(req, res));
router.delete('/tarefas/:id', (req, res) => controller.excluiTarefa(req, res));


module.exports = router;