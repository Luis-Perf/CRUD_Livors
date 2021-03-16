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
        isbn: "978-8576573135",
        titulo: "Neuromancer",
        descricao: "O Céu sobre o porto tinha cor de televisão num canal fora do ar. Considerada a obra precursora do movimento cyberpunk e um clássico da ficção científica moderna, Neuromancer conta a história de Case, um cowboy do ciberespaço e hacker da matrix. Como punição por tentar enganar os patrões, seu sistema nervoso foi contaminado por uma toxina que o impede de entrar no mundo virtual. Agora, ele vaga pelos subúrbios de Tóquio, cometendo pequenos crimes para sobreviver, e acaba se envolvendo em uma jornada que mudará para sempre o mundo e a percepção da realidade. Evoluindo de Blade Runner e antecipando Matrix, Neuromancer é o romance de estreia de William Gibson. Esta obra distópica, publicada em 1984, antevê, de modo muito preciso, vários aspectos fundamentais da sociedade atual e de sua relação com a tecnologia. Foi o primeiro livro a ganhar a chamada “tríplice coroa da ficção científica”: os prestigiados prêmios Hugo, Nebula e Philip K. Dick.",
        edicao: "Editora Aleph; 5ª edição",
        autor: "Willian Gibson"
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