/**
 * 动静分离
 */
import Mime from 'mime';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';

const serve = http.createServer((req, res) => {
  const { method, url } = req;
  console.log('请求的方法', method);
  console.log('请求的路径', url);
  // 处理静态资源
  if (method === 'GET' && url.startsWith('/static')) {
    const staticPath = path.join(process.cwd(), url);
    fs.readFile(staticPath, (err, data) => {
      if (err) {
        res.writeHead(404, {
          'Content-Type': 'text/plain',
        });
        res.end('404 Not Found');
      } else {
        console.log('获取文件');
        // 通过Mime.getType()方法获取文件类型 传入响应头
        res.writeHead(200, {
          'Content-Type': Mime.getType(staticPath),
          'Cache-Control': 'public, max-age=3600', // 控制缓存3600秒 设置这个以后 访问一次后再次访问就不会再从服务中获取了
        });
        res.end(data);
      }
    });
  }
  // 处理动态资源
  if ((method === 'GET' || method === 'POST') && url.startsWith('/api')) {
    // ...处理动态资源的逻辑
  }
});

serve.listen(3000, () => {
  console.log('server is running');
});
