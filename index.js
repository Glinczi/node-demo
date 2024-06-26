const { fork } = require('node:child_process');
const { resolve } = require('node:path');

const file = resolve(__dirname, './test-files/child.js');

// const child = fork(modulePath, [args], [options]);
// modulePath：要在子进程中运行的模块文件的路径。
// args（可选）：一个字符串数组，包含传递给模块的参数。
// options（可选）：一个配置对象，可以设置各种选项，如环境变量、工作目录等。
const childProcess = fork(file, ['ll', 'mm'], { stdio: 'pipe' });
// { stdio: 'pipe' } 添加了这个配置 必须通过监听的方式获取子进程的输出

childProcess.on('message', (msg) => {
  console.log('接受到子进程发送的消息', msg);
});

childProcess.stdout.on('data', (data) => {
  console.log('来自子进程的消息', data.toString());
});
childProcess.stderr.on('data', (data) => {
  console.log('来自子进程的错误消息', data);
});

childProcess.send('this is main process');
