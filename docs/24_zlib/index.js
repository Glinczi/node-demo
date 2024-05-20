const zlib = require('zlib');
const fs = require('fs');


/**
 * pipe 管道操作
 */

// 压缩
const zipIt = () => {
  const readStream = fs.createReadStream('./test/test.txt');
  const writeStream = fs.createWriteStream('./zip/test.txt.gz');
  readStream.pipe(zlib.createGzip()).pipe(writeStream);
};
// 解压
const unzip = () => {
  const zipReadStream = fs.createReadStream('./zip/test.txt.gz');
  const unzipWriteStream = fs.createWriteStream('./unzip/index.txt');
  zipReadStream.pipe(zlib.createGunzip()).pipe(unzipWriteStream);
}

// 无损压缩 deflate
const deflateIt = () => {
  const readStream = fs.createReadStream('./test-files/test.mp4')
  const writeStream = fs.createWriteStream('./test-files/test.mp4.defalte')
  readStream.pipe(zlib.createDeflate()).pipe(writeStream)
}

// 无损解压
const inflateIt = () => {
  const readStream = fs.createReadStream('./test-files/test.mp4.defalte')
  const writeStream = fs.createWriteStream('./test-files/test3.mp4')
  readStream.pipe(zlib.createInflate()).pipe(writeStream)
}

/**
 * 区别
 * 速度：deflate要快一点，因为gzip的压缩算法结合了 LZ77 算法和哈夫曼编码
 * 压缩效率：gzip要好点
 * 应用场景：gzip主要用于文件压缩，defalte主要用于网络传输和 HTTP 响应的内容编码
 */