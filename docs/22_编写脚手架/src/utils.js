import fs from 'node:fs';
import download from 'download-git-repo';
import ora from 'ora';
const spinner = ora('下载中...');
/**
 * 判断当前路径下有没有此文件夹
 */
export function hasFolder(path) {
  console.log('path', path);
  return fs.existsSync(path) ? true : false;
}

export function downloadTemp(branch, project) {
  spinner.start();
  return new Promise((resolve, reject) => {
    download(
      `direct:https://gitee.com/chinafaker/vue-template.git#${branch}`,
      project,
      { clone: true },
      function (err) {
        if (err) {
          reject(err);
          console.log(err);
        }
        resolve();
        spinner.succeed('下载完成');
      }
    );
  });
}
