import livros from "../models/Livro.js";

class LivroController {

    // BUSCAR TODOS OS REGISTROS
    static listarLivros = (req, res) => {
        livros.find()
            .populate('autor') //Vai popular com os dados do autor
            .exec((err, livros) => {
                res.status(200).json(livros);
            });
    }

    // ENCONTRAR REGISTRO POR ID (exibindo apenas o nome do autor)
    static listarLivroPorId = (req, res) => {
        const id = req.params.id;
        livros.findById(id)
            .populate('autor', 'nome')
            .exec((err, livros) => {
                if (err) {
                    res.status(400).send({ message: `ID DO LIVRO NÃO LOCALIZADO: ${err.message}` })
                } else {
                    res.status(200).send(livros);
                }
            });
    }

    // CADASTRAR UM NOVO REGISTRO
    static cadastrarLivro = (req, res) => {
        let livro = new livros(req.body);

        livro.save((err) => {
            if (err) {
                res.status(500).send({ message: `FALAHA AO CADASTRAR O LIVRO: ${err.message}` })
            } else {
                res.status(201).send(livro.toJSON());
            }
        });
    }

    // ALTERANDO OS DADOS DE UM REGISTRO
    static atualizarLivro = (req, res) => {
        const id = req.params.id;

        livros.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
                res.status(200).send({ message: 'Livro atualizado com sucesso' });
            } else {
                res.status(500).send({ message: `FALAHA AO ATUALIZAR O LIVRO: ${err.message}` })
            }
        })
    }

    // EXCLUIR UM REGISTRO
    static excluirLivro = (req, res) => {
        const id = req.params.id;
        livros.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({ message: 'Livro removido com sucesso' });
            } else {
                res.status(500).send({ message: `ERRO AO EXCLUIR LIVRO: ${err.message}` });
            }
        })
    }

    // ENCONTRAR REGISTRO POR EDITORA
    static listarLivroPorEditora = (req, res) => {
        const editora = req.query.editora
    
        livros.find({'editora': editora}, {}, (err, livros) => {
          res.status(200).send(livros);
        })
      }

}

export default LivroController;