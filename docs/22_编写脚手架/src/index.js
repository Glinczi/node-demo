#!/usr/bin/env node
// 这个注释是告诉操作系统，在我执行自定义命令的时候，你帮我用node执行这个文件

import { program } from 'commander'; // 构建命令行的工具
import fs from 'node:fs';
import inquirer from 'inquirer'; // 命令行交互工具
import { hasFolder, downloadTemp } from './utils.js';
// program 主要是用来解析 自定义命令后面的参数 template-cli create
// create 这些参数可以通过process.argv获取

// 读取package.json中的version
const packageInfoJSON = fs.readFileSync('./package.json');
const packageInfo = JSON.parse(packageInfoJSON);
/**
 * 实现 template-cli -V
 */
program.version(packageInfo.version); // -V
/**
 * alias 别名
 */
program
  .command('create <project>')
  .alias('crp')
  .description('create a project')
  .action((project) => {
    inquirer
      .prompt([
        {
          type: 'input', // 输入 input confirm 确认框 list 选择框 checkbox 复选框
          name: 'projectName',
          message: '请输入项目名称',
          default: project,
        },
        {
          type: 'confirm', // 输入 input confirm 确认框 list 选择框 checkbox 复选框
          name: 'isTS',
          message: '是否选用TypeScript模板',
        },
      ])
      .then((res) => {
        console.log(res);
        const { projectName, isTS } = res;
        if (hasFolder(projectName)) {
          console.log('文件已存在');
          return;
        }
        if (isTS) {
          downloadTemp('ts', projectName);
        } else {
          downloadTemp('js', projectName);
        }
        // const filePath =
      });
  });
program.parse(process.argv);
