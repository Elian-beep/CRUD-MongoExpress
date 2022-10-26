// ARQUIVO RESPONSÁVEL POR CRIAR O SERVIDOR LOCAL
import app from './src/app.js';

const port = process.env.PORT ||  3000; //Fixo || Variável de ambiente

app.listen(port, () => {
    console.log(`Server listener in http://localhost:${port}`)
});