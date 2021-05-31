const unidadesModelPg = require('../models/unidadeSaude-model-pg');

exports.adicionarUnidadePg = async (req, res) => {

    const unidade = req.body;

    const unidadeExiste = await unidadesModelPg.findAll({
        where:{
            email_unidade: unidade.email_unidade
        }
    });

    console.log(unidadeExiste);

    if(unidadeExiste.length > 0){
        res.json({
            status: 'Ok',
            message: 'Este email já está cadastrado'
        });
    }else{
        const unidadeInserida = await unidadesModelPg.create({
            nome_unidade: unidade.nome_unidade,
            descricao: unidade.descricao,
            endereco_unidade: unidade.endereco_unidade,
            email_unidade: unidade.email_unidade,
            latlong: unidade.latlong
        });
        res.json({
            status: 'Ok',
            message: unidadeInserida
        });
    }
}

exports.listarUnidadesPg = async (req, res) => {
    
    try {
        const unidades =  await unidadesModelPg.findAll();
        res.json({
            status: 'Ok',
            message: unidades
        });
    } catch (error) {
        console.log(error);
        res.json({
            status: 'erro',
            message: 'Não foi possivel listar as unidades'
        })
    }
}

exports.listarUnidadesPorIdPg = async (req, res) => {

    let id_unidade = req.params.id_unidade;

    try {
        const unidadeEspecifica = await unidadesModelPg.findByPk(id_unidade);
        console.log(unidadeEspecifica);
        
        if (unidadeEspecifica) {
            res.json({
                status: 'Ok',
                message: 'Unidade recuperada com sucesso',
                unidade: unidadeEspecifica
            });
        } else {
            res.json({
                status: 'erro',
                message: `Não foi possível recuperar a unidade de id ${id_unidade}`
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            status: 'erro',
            message: `Erro ao recuperar o id ${id_unidade}`
        })
    }
}

exports.atualizarUnidadePg = async (req, res) => {
    let id_unidade = req.params.id_unidade;

    let novaUnidade ={
        nome_unidade: req.body.nome_unidade,
        descricao: req.body.descricao,
        endereco_unidade: req.body.endereco_unidade,
        email_unidade: req.body.email_unidade,
        latlong: req.body.latlong
    }

    if(id_unidade){
        let unidadeAtualizada = await unidadesModelPg.update(novaUnidade, {where: {id: id_unidade}})
        
        if(unidadeAtualizada){
            res.json({
                status: 'Ok',
                message: 'Unidade atualizada com sucesso'
            });
        }else{
            res.json({
                status: 'erro',
                message: `Erro ao atualizar a unidade de id ${id_unidade}`
            })
        }
    }else{
        console.log('Sem id');
    }
}

exports.removerUnidadePg = async (req, res) => {
    let id_unidade = req.params.id_unidade;

    if(id_unidade){
        try {
            let unidadeDeletada = await unidadesModelPg.destroy({where: {id_unidade}});
            if(unidadeDeletada){
                res.json({
                    status: 'Ok',
                    message: `Unidade de id ${id_unidade} deletada com sucesso`
                })
            }else{
                res.json({
                    status: 'erro',
                    message: `Não foi possível remover a unidade de id ${id_unidade}`
                })
            }
        } catch (error) {
            res.json({
                status: 'erro',
                message: `Não foi possível remover a unidade de id ${id_unidade}`
            })
        }
    }
}