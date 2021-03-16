const http = require("http");
const express = require("express");
//constrói um objeto express
const app = express();
//importa o body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
//configura a porta do servidor e o coloca em execução.
const porta = 3000;
app.set("port", porta);
const server = http.createServer(app);
server.listen(3000);
let idLivro= 2;
let livros = [
    {
        id:1,
        isbn: "9788568295045",
        titulo: "Livro Ozob Volume 1 – Protocolo Molotov",
        descricao: "Alô criançada, o Ozob voltou!!! O futuro chegou. E é pior do que os nossos pesadelos.",
        edicao: "Nerdbooks",
        autor: "Leonel Caldela; Deive Pazos"
    },
    {
        id:2,
        isbn: "978-6550970260",
        titulo: "O chamado de Cthulhu e outros contos",
        descricao: "O Chamado de Cthulhu é um conto do norte-americano H.P. Lovecraft que logo se tornou um clássico do terror. Foi escrito em 1926 e publicado pela primeira vez na revista estadunidense Weird Tales em fevereiro de 1928. Cthulhu é um deus que nas primeiras páginas do conto aparece como um ídolo de argila quase indescritível, possuindo um culto multimilenar dedicado a trazê-lo de volta, o seu retorno desencadearia o fim da humanidade. Neste livro, encontramos esse clássico e mais sete contos consagrados do autor na literatura de terror.",
        edicao: "Principis; 1ª edição",
        autor: "H. P. Lovecraft"
    }
];
//CRUD Livros
//tratamento de requisições POST
app.post('/livros', (req, res, next) => {
    const livro = req.body;
    livros.push({id: idLivro +=1, isbn: livro.isbn, titulo: livro.titulo, 
        descricao: livro.descricao, edicao: livro.edicao, autor: livro.autor});
        console.log(livros);
        res.status(201).json(livros);
});
//tratamento de requisições GET
app.get('/livros', (req, res, next) => {
    res.json(livros);
});
//tratamento de requisições PUT
app.put('/livros', (req, res, next) => {
    livros.forEach((livro) => {
        if(livro.id === req.body.id) {
            livro.isbn = req.body.isbn;
            livro.titulo = req.body.titulo;
            livro.descricao = req.body.descricao;
            livro.edicao = req.body.edicao;
            livro.autor = req.body.autor;
        }
    })
    res.status(200).json(livros);
});
//tratamento de requições DELETE
app.delete('/livros', (req, res, next) => {
    livros.forEach((livro) => {
        if(livro.id === req.body.id) {
            const index = livros.indexOf(livro, 0);
            livros.splice(index, 1)
        }
    })
    res.status(200).json(livros);
})
