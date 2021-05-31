const pessoasModel = require('../models/pessoas-model')
const mongodb = require('../infra/mongodb')

exports.adionarPessoa = (req, res) => {
    pessoasModel.find((err, pessoas) => {
        if (err) {
            console.log('Não foi possível recuperar as pessoas');
            res.json({ 
                status: 'ERRO',
                message: 'Não foi possível recuperar as pessoas'
            })
        }

        for (let i = 0; i < pessoas.length; i++) {
            if(req.body.email_pessoa == pessoa[i].email_pessoa){
                res.json({
                    status: 'ERRO',
                    message: `A pessoa ${req.body.nome} já está cadastrada com o email ${req.body.email_pessoa}`
                })
                return
            }
        }

        let pessoa = new pessoasModel();
        pessoa.nome_pessoa = req.body.nome_pessoa;
        pessoa.cpf = req.body.cpf;
        pessoa.data_nascimento = req.body.data_nascimento;
        pessoa.telefone_pessoa = req.body.telefone_pessoa;
        pessoa.grupo_prioritario = req.body.grupo_prioritario;
        pessoa.endereco_pessoa = req.body.endereco_pessoa;
        pessoa.email_pessoa = req.body.email_pessoa;

        pessoa.save((err) => {
            if (err) {
                res.send({
                    status: 'Error',
                    message: 'Não foi possível inserir a pessoa'
                });
            }else{
                res.send({
                    status: 'Ok',
                    message: `A pessoa ${pessoa.nome_pessoa} foi inserida com sucesso`
                });
            }
        });
    });
}

exports.listarPessoas = (req, res) => {
    pessoasModel.find((err, pessoas) => {
        if (err) {
            console.log('Não foi possível listar as pessoas');
            res.json({ 
                status: 'ERRO',
                message: 'Não foi possível listar as pessoas'
            })
        }else{
            res.json({
                status: 'Ok',
                message: pessoas
            })
        }
    })
}

exports.listarPessoasPorID = (req, res) => {
    let id_pessoa = req.params.id;

    pessoasModel.findById(id_pessoa, (err, pessoas) => {
        if (err || !pessoas) {
            console.log(`Não foi possivel encontrar a pessoa ${id_pessoa}`);
            res.json({
                status: 'ERRO',
                message: `Não foi possivel encontrar a pessoa ${id_pessoa}`
            })
        }else{
            console.log(`Pessoa de id ${id_pessoa} encontrada na base de dados`);
            res.json({
                status: 'OK',
                message: pessoas
            })
        }
    })
}

exports.atualizarPessoa = (req, res) => {
    let id_pessoa = req.params.id;

    pessoasModel.findById(id_pessoa, (err, pessoas) =>{
        if(err || !pessoas){
            console.log(`Não foi possível atualizar a pessoa com id ${id_pessoa} `);
            res.json({
                status: 'ERRO',
                message: `Não foi possível atualizar a pessoa com id ${id_pessoa} `
            })
        }else{
            pessoas.nome_pessoa = req.body.nome_pessoa;
            pessoas.cpf = req.body.cpf;
            pessoas.data_nascimento = req.body.data_nascimento;
            pessoas.telefone_pessoa = req.body.telefone_pessoa;
            pessoas.grupo_prioritario = req.body.grupo_prioritario;
            pessoas.endereco_pessoa = req.body.endereco_pessoa;
            pessoas.email_pessoa = req.body.email_pessoa;
            pessoas.data_alteracao = Date.now();

            pessoas.save((err) => {
                if (err) {
                    res.json({ 
                        status: 'ERRO',
                        message: `Houve um erro ao atualizar a pessoa ${pessoas.nome_pessoa}`
                    })
                }else{
                    res.json({
                        status: 'OK',
                        message: `Os dados de ${pessoas.nome_pessoa} foram atualizados com sucesso`,
                        novaPessoa: pessoas
                    })
                }
            })
        }
    })
}

exports.removerPessoas = (req, res) => {
    let id_pessoa = req.params.id;

    pessoasModel.remove({
        _id: id_pessoa
    }, (err, pessoas) => {
        if (err) {
            res.json({ 
                status: 'ERRO',
                message: `Não foi possível remover a pessoa ${pessoas.nome_pessoa}`
            })
        }else{
            res.json({
                status: 'Ok',
                message: `A pessoa foi deletada com sucesso`
            })
        }
    })
}