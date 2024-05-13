## How to

1. 自定义一个命令
   a. 类似 -v --help create 命令行交互工具

```JSON
package.json 添加 bin
"bin": {
    "template-cli": "src/index.js"
  },
运行下面的命令创建软链接
npm link
```

2. 去下载模板
3.
