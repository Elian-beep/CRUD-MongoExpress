import autores from "../models/Autor.js";

class AutorController{
    
    // BUSCAR TODOS OS REGISTROS
    static listarAutores = (req, res) => {
        autores.find((err, autores) => {
            res.status(200).json(autores);
        });
    }

    // ENCONTRAR REGISTRO POR ID
    static listarAutorPorId = (req, res) => {
        const id = req.params.id;
        autores.findById(id, (err, autores) => {
            if(err){
                res.status(400).send({message: `ID DO AUTOR NÃO LOCALIZADO: ${err.message}`})
            }else{
                res.status(200).send(autores);
            }
        });
    }

    // CADASTRAR UM NOVO REGISTRO
    static cadastrarAutor = (req, res) => {
        let autor = new autores(req.body);

        autor.save((err) => {
            if (err) {
                res.status(500).send({message: `FALHA AO CADASTRAR AUTOR: ${err.message}`})
            }else{
                res.status(201).send(autor.toJSON());
            }
        })
    }

    // ALTERANDO OS DADOS DE UM REGISTRO
    static atualizarAutor = (req, res) => {
        const id = req.params.id;

        autores.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if (!err) {
                res.status(200).send({message: 'Autor atualizado com sucesso'})
            }else{
                res.status(500).send({message: `FALHA AO ATUALIZAR O AUTOR: ${err.message}`})
            }
        });
    }

    // EXCLUIR UM REGISTRO
    static excluirAutor = (req, res) => {
        const id = req.params.id;
        autores.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({message: 'Autor removido com sucesso'});
            }else{
                res.status(500).send({message: `ERRO AO EXCLUIR AUTOR: ${err.message}`})
            }
        });
    }

}

export default AutorController;