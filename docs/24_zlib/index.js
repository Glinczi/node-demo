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

// 无损压缩
