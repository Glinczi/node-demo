import express from 'express';
const app = express();

/**
 * 防盗链中间件
 * 主要是通过判断referer来判断，是否给于访问权限
 */
const preventHotLinking = (req, res, next) => {
  // host -- 主机 指出正在访问的互联网主机和端口号
  // referer -- 引用来源 当前请求页面的来源地址
  const whiteList = ['localhost'];
  const referer = req.get('referer');
  if (referer) {
    let { hostname } = new URL(referer); // 获取主机名
    if (!whiteList.includes(hostname)) {
      res.status(403).send('403 Forbidden')
      return;
    }
  }
  next();
};

app.use(preventHotLinking); // 注册防盗链中间件

// 初始化静态资源目录
app.use('/static', express.static('static'));

app.listen(3000, () => {
  console.log('server is running');
});
