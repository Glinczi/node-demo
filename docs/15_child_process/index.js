const childProcess = require('child_process');
const { resolve } = require('path');
/**
 * 1. exec 异步执行命令
 * 2. execSync 同步执行命令
 * 3. execFile 异步执行可执行的文件
 * 4. execFileSync 同步执行可执行的文件
 * 5. spawn 异步执行命令
 * 6. spawnSync 同步执行命令
 * 7. fork 创建node子进程
 */

const { exec, execSync, execFile, execFileSync, spawn } = childProcess;
const date = new Date();
const err_date = `${
  date.getMonth() + 1
}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;

// exec(command,[option],callback)
exec('node -v', (err, stdout, stderr) => {
  if (err) {
    console.log(`错误：[${err_date}]_err`, err);
  } else {
    console.log(stdout.toString());
  }
});
console.log(execSync('python --version').toString());

// execFile
const file = resolve(__dirname, './test/bat.cmd');
execFile(file, null, (err, stdout) => {
  if (err) {
    console.log(`错误：[${err_date}]_err`, err);
  } else {
    console.log(stdout.toString());
  }
});

// spawn
// 用于执行一些实时获取的信息，因为spawn返回的是流，边执行边返回
// exec返回的是一个完整的buffer buffer的大小是200k,超出就会报错，而spawn无上限
// spawn在执行完成后会抛出close事件监听，并返回状态码，通过状态码可以知道子进程是否顺利执行。exec只能通过返回的buffer去识别完成状态，识别起来较为麻烦
const { stdout } = spawn('netstat', ['-an'], {});
stdout.on('data', (steram) => {
  console.log(steram.toString());
});
