const os = require('node:os');
const { exec } = require('child_process');

console.log(os.type()); // 操作系统类型
console.log(os.platform()); // 操作系统平台
console.log(os.release()); // 操作系统版本
console.log(os.homedir()); // 用户目录
console.log(os.arch()); // 系统架构
console.log(os.cpus()); // cpu线程信息
console.log(os.networkInterfaces()); // 网络信息

// 案例 模拟webpack或vite中 open:true 的效果

const openBrowser = (url) => {
  const platform = os.platform();
  switch (platform) {
    case 'darwin':
      exec(`open ${url}`);
      break;
    case 'win32':
      exec(`start ${url}`);
      break;
    default:
      exec(`xdg-open ${url}`);
  }
};

openBrowser('https://baidu.com');
