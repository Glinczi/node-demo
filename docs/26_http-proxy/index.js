/**
 * 反向代理
 * 一种网络通信模式
 * 充当客户端和服务器之间的中介，将客户端的请求转发到多个后端服务器上，并将后端的响应返回给客户端
 */

// 需要 http-proxy-middleware
// 通过index.js起一个80端口的服务 去代理 index-third.js 3000端口的服务
const http = require('node:http');
const url = require('node:url');
const { createProxyMiddleware } = require('http-proxy-middleware');
const fs = require('node:fs');
const config = require('./proxy.config');
const html = fs.readFileSync('./index.html'); // 读取html文件

http
  .createServer((req, res) => {
    const { pathname } = url.parse(req.url);
    console.log('80', pathname);
    const proxyList = Object.keys(config.server.proxy);
    if (proxyList.includes(pathname)) {
      // 通过反向代理到3000端口
      const proxy = createProxyMiddleware(config.server.proxy[pathname]);
      proxy(req, res);
      return
    }
    // 将 html 和 80 服务相关连
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    res.end(html);
  })
  .listen(80, () => {
    console.log('80服务开启');
    // 选用80端口是因为80端口是默认端口，所以可以直接访问
  });
