import livros from "../models/Livro.js";

class LivroController {

    // BUSCAR TODOS OS REGISTROS
    static listarLivros = (req, res) => {
        livros.find((err, livros) => {
            res.status(200).json(livros);
        });
    }

    // CADASTRAR UM NOVO REGISTRO
    static cadastrarLivro = (req, res) => {
        let livro = new livros(req.body);

        livro.save((err) => {
            if (err) {
                res.status(500).send({message: `FALAHA AO CADASTRAR O LIVRO: ${err.message}`})
            }else{
                res.status(201).send(livro.toJSON());
            }
        });
    }
}

export default LivroController;