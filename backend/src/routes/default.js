let router = require('express').Router();

router.get('/', function (req, res){
    res.json({
        status: 'Ok',
        message: 'Servidor da unidade de saúde funcionando'
    })
})

module.exports = router;