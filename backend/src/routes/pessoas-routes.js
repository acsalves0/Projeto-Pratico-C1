let router = require('express').Router();

const pessoasController = require('../controllers/pessoas-controller')

router.post('/', pessoasController.adionarPessoa);

router.get('/', pessoasController.listarPessoas);

router.get('/:id', pessoasController.listarPessoasPorID);

router.put('/:id', pessoasController.atualizarPessoa);

router.delete('/:id', pessoasController.removerPessoas);

module.exports = router;