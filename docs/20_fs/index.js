/**
 * fs 模块
 */
const { resolve } = require('path');
const fs = require('fs'); // 普通回调方式
const fsPromise = require('fs/promises'); // promise方式

const file = resolve(__dirname, './test/test.gif');
fs.readFile(file, (err, data) => {
  if (err) {
    console.log('读取文件错误:', err);
  } else {
    console.log('读取文件成功:', data);
  }
});
// fs支持同步和异步两种模式 增加了Sync fs 就会采用同步的方式运行代码，会阻塞下面的代码，不加Sync就是异步的模式不会阻塞。
let fileData = fs.readFileSync(file);
console.log('读取的文件', fileData);

// fs新增了promise版本，只需要在引入包后面增加/promise即可，fs便可支持promise回调。
fsPromise
  .readFile(file)
  .then((resolve) => {
    console.log('读取文件成功:', resolve);
  })
  .catch((err) => {
    console.log('读取文件错误:', err);
  });

// fs返回的是一个buffer二进制数据 每两个十六进制数字表示一个字节

/**
 * 使用可读流读取
 * createReadStream
 */

const readStream = fs.createWriteStream(file, { encoding: 'utf-8' });
readStream.on('data', (chunk) => {
  // console.log('可读流chunk', chunk);
});
readStream.on('end', () => {
  // console.log('可读流读取结束');
});

/**
 * 创建文件夹
 * mkdir
 */
fs.mkdir(resolve(__dirname, './test/new_test1'), (res) => {
  if (res) {
    console.log('创建文件夹失败', err);
  } else {
    console.log('创建文件夹成功');
  }
});
// recursive 可以递归创建文件夹
fs.mkdir(
  resolve(__dirname, './test/new_test2/test_inside'),
  { recursive: true },
  (res) => {
    if (res) {
      console.log('创建文件夹失败', err);
    } else {
      console.log('创建文件夹成功');
    }
  }
);

/**
 * 删除文件夹
 * rm
 */
fs.rm(resolve(__dirname, './test/new_test1'), { recursive: true }, (err) => {
  if (err) {
    console.log('删除文件失败', err);
  } else {
    console.log('删除文件成功');
  }
});

/**
 * 重命名文件
 * renameSync(oldPath, newPath)
 */
fs.rename(
  resolve(__dirname, './test/new_test1'),
  resolve(__dirname, './test/new_test2'),
  (res) => {
    if (res) {
      console.log('重命名失败', res);
    } else {
      console.log('重命名成功');
    }
  }
);

/**
 * 监听文件变化
 * watch(fileName,[options],listener)
 */
fs.watch(resolve(__dirname, './test/new_test2'), (event, fileName) => {
  console.log(event, fileName);
});
