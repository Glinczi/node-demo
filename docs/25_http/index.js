/**
 * http
 */
const http = require('node:http');
const url = require('node:url'); // 用于处理路由上的参数

// createServer 创建服务器
http
  .createServer((req, res) => {
    // 1.如何区分是哪种请求方式  req.method
    const method = req.method;
    // 2.如何获取路由信息 parse(路由, 是否将query反序列化:Boolean)
    const { pathname, query } = url.parse(req.url, true);
    if (pathname === '/login') {
      // post 请求的参数是一个流 需要监听接受
      let data = '';
      req.on('data', (chunk) => {
        console.log(chunk);
        data += chunk;
      });
      req.on('end', () => {
        res.setHeader('Content-type', 'application/json');
        res.statusCode = 200;
        res.end(data);
      });
    } else if (pathname === '/list') {
      // query 中存放路由中拼接的查询字符串
      res.end(JSON.stringify(query))
    } else {
      res.end(
        JSON.stringify({
          code: 404,
          msg: '请求失败',
        })
      );
    }
  })
  .listen(8080, () => {
    console.log('服务启动');
  });
