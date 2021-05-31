const pessoasModelPg = require('../models/unidadeSaude-model-pg');

exports.adicionarPessoaPg = async (req, res) => {

    const pessoa = req.body;

    const pessoaExiste = await pessoasModelPg.findAll({
        where:{
            email_pessoa: pessoa.email_pessoa
        }
    });

    console.log(pessoaExiste);

    if(pessoaExiste.length > 0){
        res.json({
            status: 'Ok',
            message: 'Este email já está cadastrado'
        });
    }else{
        const pessoaInserida = await pessoasModelPg.create({
           nome_pessoa: pessoa.nome_pessoa,
           cpf: pessoa.cpf,
           data_nascimento: pessoa.data_nascimento,
           telefone_pessoa: pessoa.telefone_pessoa,
           grupo_prioritario: pessoa.grupo_prioritario,
           endereco_pessoa: pessoa.endereco_pessoa,
           email_pessoa: pessoa.email_pessoa,
        });
        res.json({
            status: 'Ok',
            message: pessoaInserida
        });
    }
}

exports.listarPessoasPg = async (req, res) => {
    
    try {
        const pessoas =  await pessoasModelPg.findAll();
        res.json({
            status: 'Ok',
            message: pessoas
        });
    } catch (error) {
        console.log(error);
        res.json({
            status: 'erro',
            message: 'Não foi possivel listar as pessoas'
        })
    }
}

exports.listarPessoasPorIdPg = async (req, res) => {

    let id_pessoas = req.params.id_pessoas;

    try {
        const pessoaEspecifica = await pessoasModelPg.findByPk(id_pessoas);
        console.log(pessoaEspecifica);
        
        if (pessoaEspecifica) {
            res.json({
                status: 'Ok',
                message: 'Pessoa recuperada com sucesso',
                unidade: pessoaEspecifica
            });
        } else {
            res.json({
                status: 'erro',
                message: `Não foi possível recuperar a pessoa de id ${id_pessoas}`
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            status: 'erro',
            message: `Erro ao recuperar o id ${id_pessoas}`
        })
    }
}

exports.atualizarPessoaPg = async (req, res) => {
    let id_pessoas = req.params.id_pessoas;

    let novaPessoa ={
        nome_pessoa: req.body.nome_pessoa,
        cpf: req.body.cpf,
        data_nascimento: req.body.data_nascimento,
        telefone_pessoa: req.body.telefone_pessoa,
        grupo_prioritario: req.body.grupo_prioritario,
        endereco_pessoa: req.body.endereco_pessoa,
        email_pessoa: req.body.email_pessoa
    }

    if(id_pessoas){
        let pessoaAtualizada = await pessoasModelPg.update(novaPessoa, {where: {id: id_pessoas}})
        
        if(pessoaAtualizada){
            res.json({
                status: 'Ok',
                message: 'Pessoa atualizada com sucesso'
            });
        }else{
            res.json({
                status: 'erro',
                message: `Erro ao atualizar a pessoa de id ${id_pessoas}`
            })
        }
    }else{
        console.log('Sem id');
    }
}

exports.removerPessoaPg = async (req, res) => {
    let id_pessoas = req.params.id_pessoas;

    if(id_pessoas){
        try {
            let pessoaDeletada = await pessoasModelPg.destroy({where: {id_pessoas}});
            if(pessoaDeletada){
                res.json({
                    status: 'Ok',
                    message: `Pessoa de id ${id_pessoas} deletada com sucesso`
                })
            }else{
                res.json({
                    status: 'erro',
                    message: `Não foi possível remover a pessoa de id ${id_pessoas}`
                })
            }
        } catch (error) {
            res.json({
                status: 'erro',
                message: `Não foi possível remover a pessa de id ${id_pessoas}`
            })
        }
    }
}