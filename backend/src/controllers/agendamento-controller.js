const agendamentoModel = require('../models/agendamento-model');
const mongodb = require('../infra/mongodb')

exports.adicionarAgendamentos = (req, res) => {
    agendamentoModel.find((err, agendamentos) => {
        if (err) {
            console.log('Não foi possível registrar novo agendamento');
            res.json({ 
                status: 'Erro',
                message: 'Não foi possivel registrar novo agendamento'
            })
        }
        
        for (let i = 0; i < agendamentos.length; index++) {
            if(req.body.data_hora_agendamento == agendamentos[i].data_hora_agendamento){
                res.json({
                    status: 'Erro',
                    message: `O agendamento com a data e horário ${req.body.data_hora_agendamento} já está preenchido `
                })
            }
            return;
        }

        let agendamento = new agendamentoModel();

        agendamento.data_hora_agendamento = req.body.data_hora_agendamento;
        agendamento.necessidade_especiais = req.body.necessidade_especiais;
        agendamento.observacoes_agendamento = req.body.observacoes_agendamento;

        agendamento.save((err) => {
            if (err) {
                res.send({
                    status: 'ERROR',
                    message: 'Não foi possível inserir o novo agendamento'
                })
            }else{
                res.send({
                    status: 'OK',
                    message: `Agendamento de ${agendamento.data_hora_agendamento} foi feito com sucesso`
                })
            }
        });
        
    });
}

exports.listarAgendamentos = (req, res) => {
    
    agendamentoModel.find((err, agendamento) => {
        if (err) {
            console.log('Nao foi possivel listar os agendamentos');
            res.json({ 
                status: 'error',
                message: 'Nao foi possivel listar os agendamentos'
            })
        }else{
            res.json({
                status: 'Ok',
                message: agendamento
            })
        }
    })
}

exports.listarAgendamentosPorId = (req, res) => {
    let id_agendamento = req.params.id

    agendamentoModel.findById(id_agendamento, (err, agendamento) => {
        if (err || !agendamento)  {
            console.log(`Nao foi possivel encontrar o agendamento com o id ${id_agendamento}`);
            res.json({
                status: 'ERRO',
                message: `Nao foi possivel encontrar o agendamento com o id ${id_agendamento}`
            })
        }else{
            console.log(`O agendamento com o id ${id_agendamento} foi encontrado na base de dados`);
            res.json({
                status: 'OK',
                message: agendamento
            })
        }
    })
}

exports.atualizarAgendamentos = (req, res) => {
    let id_agendamento = req.params.id;

    agendamentoModel.findById(id_agendamento, (err, agendamento) => {
        if (err || !agendamento) {
            console.log(`Não foi possível atualizar o agendamento de id ${id_agendamento}`);
            res.json({ 
                status: 'Erro',
                message: `Não foi possível atualizar o agendamento de id ${id_agendamento}`
            })
        }else{

            agendamento.data_hora_agendamento = req.body.data_hora_agendamento;
            agendamento.necessidade_especiais = req.body.necessidade_especiais;
            agendamento.observacoes_agendamento = req.body.observacoes_agendamento;
            agendamento.data_alteracao = Date.now();

            agendamento.save((err) =>{
                if(err){
                    res.json({
                        status: 'Erro',
                        message: `Houve um erro ao atualizar o agendamento do dia ${agendamento.data_hora_agendamento}`
                    })
                }else{
                    res.json({
                        status: 'Ok',
                        message: `O agendamento do dia ${agendamento.data_hora_agendamento} foi atualizado com sucesso`,
                        novoAgendamento: agendamento
                    })
                }
            })
        }
    })
}

exports.removerAgendamentos = (req, res) => {
    let id_agendamento = req.params.id

    agendamentoModel.remove({
        _id: id_agendamento
    }, (err, agendamentos) =>{
        if(err){
            res.json({ 
                status: 'ERROR',
                message: `Não foi possível remover o agendamento do dia ${agendamentos.data_hora_agendamento}`
            })
        }else{
            res.json({
                status: 'OK',
                message: 'O agendamento selecionado foi deletado com sucesso'
            })
        }
    })
}