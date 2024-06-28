/**
 * 邮箱服务
 */
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import nodemailder from 'nodemailer'; // 可用于调用自己的邮箱发邮件
import yaml from 'js-yaml'; // yaml文件解析

const configYamlPath = path.join(process.cwd(), 'config.yaml');
const config = yaml.load(fs.readFileSync(configYamlPath, 'utf8'));

let transPort = nodemailder.createTransport({
  service: 'qq',
  port: 587,
  host: 'smtp.qq.com',
  secure: true,
  auth: {
    pass: config.pwd,
    user: config.user,
  },
});

const serve = http.createServer((req, res) => {
  const { method, url } = req;
  let emailInfo = '';
  if (method === 'POST' && url.startsWith('/send/email')) {
    req.on('data', (chunk) => {
      emailInfo += chunk.toString();
    });

    req.on('end', async () => {
      const info = JSON.parse(emailInfo);
      try {
        await transPort.sendMail({
          to: info.to,
          from: config.user,
          subject: info.subject,
          text: info.text,
        });
        res.end('success');
      } catch (error) {
        res.end('error');
      }
    });
  }
});

serve.listen(3000, () => {
  console.log('server is running');
});
