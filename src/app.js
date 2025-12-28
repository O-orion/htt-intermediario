import express from 'express';
import router from './routes/index.routes.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/v1', router);

app.listen(PORT, (req, res) => {
    console.log(`Servidor rodando na porta: ${PORT}`);
})
