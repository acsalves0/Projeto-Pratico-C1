const unidadesModel = require('../models/unidadeSaude-model')
const mongodb = require('../infra/mongodb')

exports.adionarUnidade = (req, res) => {
    unidadesModel.find((err, unidades) => {
        if (err) {
            console.log('Não foi possível recuperar a unidade');
            res.json({ 
                status: 'ERRO',
                message: 'Não foi possível recuperar a unidade'
            })
        }

        for (let i = 0; i < unidades.length; i++) {
            if(req.body.email_unidade == unidade[i].email_unidade){
                res.json({
                    status: 'ERRO',
                    message: `A unidade ${req.body.nome_unidade} já está cadastrada com o email ${req.body.email_unidade}`
                });
                return;
            }
        }

        let unidade = new unidadesModel();
            unidade.nome_unidade = req.body.nome_unidade;
            unidade.descricao = req.body.descricao;
            unidade.endereco_unidade = req.body.endereco_unidade;
            unidade.telefone_unidade = req.body.telefone_unidade;
            unidade.email_unidade = req.body.email_unidade;
            unidade.latlong = req.body.latlong;

        unidade.save((err) => {
            if (err) {
                res.send({
                    status: 'Error',
                    message: 'Não foi possível inserir a unidade'
                });
            }else{
                res.send({
                    status: 'Ok',
                    message: `A unidade ${unidade.nome_unidade} foi inserida com sucesso`
                });
            }
        });
    });
}

exports.listarUnidades = (req, res) => {
    unidadesModel.find((err, unidades) => {
        if (err) {
            console.log('Não foi possível listar as unidades');
            res.json({ 
                status: 'ERRO',
                message: 'Não foi possível listar as unidades'
            })
        }else{
            res.json({
                status: 'Ok',
                message: unidades
            })
        }
    })
}

exports.listarUnidadesPorID = (req, res) => {
    let id_unidade = req.params.id;

    unidadesModel.findById(id_unidade, (err, unidades) => {
        if (err || !unidades) {
            console.log(`Não foi possivel encontrar a unidade ${id_unidade}`);
            res.json({
                status: 'ERRO',
                message: `Não foi possivel encontrar a unidade ${id_unidade}`
            })
        }else{
            console.log(`unidade de id ${id_unidade} encontrada na base de dados`);
            res.json({
                status: 'OK',
                message: unidades
            })
        }
    })
}

exports.atualizarUnidade = (req, res) => {
    let id_unidade = req.params.id;

    unidadesModel.findById(id_unidade, (err, unidades) =>{
        if(err || !unidades){
            console.log(`Não foi possível atualizar a unidade com id ${id_unidade} `);
            res.json({
                status: 'ERRO',
                message: `Não foi possível atualizar a unidade com id ${id_unidade} `
            })
        }else{
            unidades.nome_unidade = req.body.nome_unidade;
            unidades.descricao = req.body.descricao;
            unidades.endereco_unidade = req.body.endereco_unidade;
            unidades.telefone_unidade = req.body.telefone_unidade;
            unidades.email_unidade = req.body.email_unidade;
            unidades.latlong = req.body.latlong;
            unidades.data_alteracao = Date.now();

            unidades.save((err) => {
                if (err) {
                    res.json({ 
                        status: 'ERRO',
                        message: `Houve um erro ao atualizar a unidade ${unidades.nome_unidade}`
                    })
                }else{
                    res.json({
                        status: 'OK',
                        message: `A unidade ${unidades.nome_unidade} foi atualizado com sucesso`,
                        novaUnidade: unidades
                    })
                }
            })
        }
    })
}

exports.removerUnidades = (req, res) => {
    let id_unidade = req.params.id;

    unidadesModel.remove({
        _id: id_unidade
    }, (err, unidades) => {
        if (err) {
            res.json({ 
                status: 'ERRO',
                message: `Não foi possível remover a unidade ${unidades.nome_unidade}`
            })
        }else{
            res.json({
                status: 'Ok',
                message: 'A unidade foi deletada com sucesso'
            })
        }
    })
}