import express from 'express';
import noteRouter from './routes/notes.js';

const app = express();

app.use('/notes', noteRouter);

app.listen(3000, () => {
  console.log('Server jalan di http://localhost:3000');
});