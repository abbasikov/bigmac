import express from 'express';
import cors from 'cors';
import baseRoute from './controllers/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.options('*', cors());
app.use('/', baseRoute);

app.listen(PORT, () => {

  console.log(`Server is running at port ${PORT}`);

});