import express, { json } from 'express';

const app = express(); //Instanciando o express
app.use(express.json())

const livros = [
    {
        id: 1,
        "titulo": "Senhor dos anés"
    },
    {
        id: 2,
        "titulo": "O Hobbit"
    }
]

app.get('/', (req, res) => {
    res.status(200).send('curso de node');
});

app.get('/livros', (req, res) => {
    res.status(200).json(livros);
});

app.get('/livros/:id', (req, res) => {
    let index = buscaLivro(req.params.id);
    res.status(200).json(livros[index]);
});

app.post('/livros', (req, res) => {
    livros.push(req.body);
    res.status(201).send('Livro cadastrado com sucesso');
});

app.put('/livros/:id', (req, res) => {
    let index = buscaLivro(req.params.id);
    livros[index] = req.body;
    res.status(200).json(livros);
});

app.delete('/livros/:id', (req, res) => {
    let {id} = req.params;
    let index = buscaLivro(id);
    livros.splice(index, 1);
    res.status(200).json({menssagem: 'Livro excluído'});
});

//busca um livro no array pelo id
function buscaLivro(id){
    return livros.findIndex(livro => livro.id == id);
}

export default app;     