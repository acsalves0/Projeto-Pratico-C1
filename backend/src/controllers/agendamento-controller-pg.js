const agendamentoModelPg = require('../models/agendamento-model-pg');


exports.adicionarAgendamentoPg = async (req, res) => {

    const agendamento = req.body;

    const agendamentoExiste = await agendamentoModelPg.findAll({
        where:{
            data_hora_agendamento: agendamento.data_hora_agendamento
        }
    });

    console.log(agendamentoExiste);

    if(agendamentoExiste.length > 0){
        res.json({
            status: 'Ok',
            message: 'Já existe um agendamento para este horário'
        });
    }else{
        const agendamentoInserido = await agendamentoModelPg.create({
            data_hora_agendamento: agendamento.data_hora_agendamento,
            necessidade_especiais: agendamento.necessidade_especiais,
            observacoes_agendamento: agendamento.observacoes_agendamento
        });
        res.json({
            status: 'Ok',
            message: agendamentoInserido
        });
    }
}

exports.listarAgendamentosPg = async (req, res) => {
    
    try {
        const agendamentos=  await agendamentoModelPg.findAll();
        res.json({
            status: 'Ok',
            message: agendamentos
        });
    } catch (error) {
        console.log(error);
        res.json({
            status: 'erro',
            message: 'Não foi possivel listar os agendamentos'
        })
    }
}

exports.listarAgendamentosPorIdPg = async (req, res) => {

    let id_agendamento = req.params.id_agendamento;

    try {
        const agendamentoEspecifico = await agendamentoModelPg.findByPk(id_agendamento);
        console.log(agendamentoEspecifico);
        
        if (agendamentoEspecifico) {
            res.json({
                status: 'Ok',
                message: 'Agendamento recuperado com sucesso',
                agendamento: agendamentoEspecifico
            });
        } else {
            res.json({
                status: 'erro',
                message: `Não foi possível recuperar o agendamento de id ${id_agendamento}`
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            status: 'erro',
            message: `Erro ao recuperar o id ${id_agendamento}`
        })
    }
}

exports.atualizarAgendamentoPg = async (req, res) => {
    let id_agendamento = req.params.id_agendamento;

    let novoAgendamento ={
        data_hora_agendamento: req.body.data_hora_agendamento,
        necessidade_especiais: req.body.necessidade_especiais,
        observacoes_agendamento: req.body.observacoes_agendamento
    }

    if(id_agendamento){
        let agendamentoAtualizado = await agendamentoModelPg.update(novoAgendamento, {where: {id: id_agendamento}})
        
        if(agendamentoAtualizado){
            res.json({
                status: 'Ok',
                message: 'Agendamento atualizado com sucesso'
            });
        }else{
            res.json({
                status: 'erro',
                message: `Erro ao atualizar o agendamento de id ${id_agendamento}`
            })
        }
    }else{
        console.log('Sem id');
    }
}

exports.removerAgendamentoPg = async (req, res) => {
    let id_agendamento = req.params.id_agendamento;

    if(id_agendamento){
        try {
            let agendamentoDeletado = await agendamentoModelPg.destroy({where: {id_agendamento}});
            if(agendamentoDeletado){
                res.json({
                    status: 'Ok',
                    message: `Agendamento de id ${id_agendamento} deletado com sucesso`
                })
            }else{
                res.json({
                    status: 'erro',
                    message: `Não foi possível remover o agendamento de id ${id_agendamento}`
                })
            }
        } catch (error) {
            res.json({
                status: 'erro',
                message: `Não foi possível remover o agendamento de id ${id_agendamento}`
            })
        }
    }
}