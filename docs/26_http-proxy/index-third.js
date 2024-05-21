const http = require('node:http');
const url = require('node:url');

http
  .createServer((req, res) => {
    const { pathname } = url.parse(req.url);
    console.log('3000', pathname);
    if(pathname === '/api') res.end('prxoy success')
  })
  .listen(3000, () => {
    console.log('3000服务开启');
  });