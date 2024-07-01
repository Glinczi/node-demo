import express from 'express';
import loggerMiddleware from './middleware/log.js';
import Login from './router/login.js'
import User from './router/user.js'

const app = express();

// 监听端口
app.listen(3000, () => {
  console.log('server is running');
});

// 注册中间件 获取POST请求体
app.use(express.json());
app.use(loggerMiddleware)

// 注册路由
app.use('/login', Login);
app.use('/user', User);

// get请求
app.get('/', (req, res) => {
  console.log('query in get request', req.query);
  res.send('this is get request with query');
});

app.get('/:id', (req, res) => {
  console.log('params in get request', req.params);
  res.send('this is get request with params');
});

// post请求
app.post('/post', (req, res) => {
  // 需要注册中间件 不然无法获取请求体
  console.log('body in post request', req.body);
  res.send('this is post request');
});

