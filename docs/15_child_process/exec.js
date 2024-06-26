const { exec, execSync } = require('node:child_process');

// 异步方法
exec('node -v', (err, stdout, stderr) => {
  console.log(stdout); // v18.19.0
});

// 同步方法
const stdout = execSync('node -v'); // 直接返回的是一个Buffer
console.log('by sync stdout', stdout); // <Buffer 76 31 38 2e 31 39 2e 30 0d 0a>
console.log('by sync stdout', stdout.toString()); // v18.19.0

execSync('mkdir test'); // 创建一个test文件夹

execSync('calc') // 打开电脑的计算机工具
