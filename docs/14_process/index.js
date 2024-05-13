const process = require('process');

console.log(process.arch); // cpu架构 区别os方法的是，os是方法
console.log(process.cwd()); // 返回当前工作目录
console.log(__dirname);
console.log(process.cwd() === __dirname); // true
console.log(process.argv); // 获取执行进程后面的参数 返回是一个数组
console.log(process.memoryUsage()); // 当前进程内存使用情况
/**
 * 
{
  rss: 30932992, 常驻集大小 这是进程当前占用的物理内存量，不包括共享内存和页面缓存。它反映了进程实际占用的物理内存大小
  heapTotal: 6438912, 堆区总大小 这是 V8 引擎为 JavaScript 对象分配的内存量。它包括了已用和未用的堆内存
  heapUsed: 5678624, 已用堆大小
  external: 423221, 外部内存使用量 这部分内存不是由 Node.js 进程直接分配的，而是由其他 C/C++ 对象或系统分配的
  arrayBuffers: 17606 是用于处理二进制数据的对象类型，它使用了 JavaScript 中的 ArrayBuffer 接口。这个属性显示了当前进程中 ArrayBuffers 的数量
}
 */
// process.exit()
// process.kill(process.pid)
console.log(process.env); // 用于读取操作系统所有的环境变量，也可以修改和查询环境变量。
