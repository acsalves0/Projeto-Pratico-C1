let router = require('express').Router();
const unidadesController = require('../controllers/unidadeSaude-controller')

router.post('/', unidadesController.adionarUnidade);

router.get('/', unidadesController.listarUnidades);

router.get('/:id', unidadesController.listarUnidadesPorID);

router.put('/:id', unidadesController.atualizarUnidade);

router.delete('/:id', unidadesController.removerUnidades);

module.exports = router

