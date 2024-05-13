const ejs = require('ejs'); // 处理将html渲染到ejs模板上的
const marked = require('marked'); // 将markdown文本转变成html
const fs = require('fs');
const { resolve } = require('path');
const browser = require('browser-sync').create(); // 自动开启一个服务用于加载对应的html文件

// 首先先获取md中的内容
const mdFilePath = resolve(__dirname, './Note.md');
const templatePath = resolve(__dirname, './template.ejs');

// 初始化浏览器
const openBrowser = () => {
  browser.init({
    server: {
      baseDir: './',
      index: 'index.html',
    },
  });
};

const init = (callBack) => {
  fs.readFile(mdFilePath, { encoding: 'utf-8' }, (err, data) => {
    if (err) throw err;
    // 将md中的内容转换成html
    const htmlFromMd = marked.parse(data.toString());
    // 将mdHtml渲染到对应的模板上面
    ejs.renderFile(
      templatePath,
      {
        title: 'markdown to html',
        content: htmlFromMd,
      },
      (err, data) => {
        if (err) throw err;
        const writeSteam = fs.createWriteStream('index.html', {
          encoding: 'utf-8',
        });
        writeSteam.write(data);
        writeSteam.end(); // 标记写入完毕
        writeSteam.on('finish', () => {
          console.log('文件写入完毕');
          callBack();
        });
      }
    );
  });

  // 实现热重载
  fs.watchFile(mdFilePath, (curr, prev) => {
    if (prev.mtime !== curr.mtime || prev.size !== curr.size)
      init(() => {
        browser.reload();
      });
  });
};
init(() => {
  openBrowser();
});
