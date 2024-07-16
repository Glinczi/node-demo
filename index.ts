import express from 'express';
import user from './router/user'
const app = express();
app.use(express.json());
app.use('/user', user);



app.listen(3000, () => {
  console.log('serve is ready');
});
