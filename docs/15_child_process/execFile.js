const { execFile } = require('node:child_process');
const { resolve } = require('node:path');

const file = resolve(__dirname, './test-files/bat.cmd');
execFile(file, null, (err, stdout) => {
  if (err) {
    console.log(`错误：[${err_date}]_err`, err);
  } else {
    console.log(stdout.toString());
  }
});
