import mysql from 'mysql2/promise';
import express from 'express';
import yaml from 'js-yaml';
import fs from 'node:fs';

// 获取数据库配置
const { dbInfo } = yaml.load(fs.readFileSync('./db.config.yaml', 'utf-8'));
const dB = await mysql.createConnection(dbInfo);

const app = express();
app.use(express.json());

/**
 * 增加用户信息
 */
app.post('/userInfo/add', async (req, res) => {
  const { userName, age } = req.body;
  const createTime = new Date();
  const sql = `INSERT INTO user (user_name, age, create_time) VALUES (?,?,?)`;
  try {
    await dB.execute(sql, [userName, age, createTime]);
    res.send('添加成功');
  } catch (error) {
    console.log(error);
    res.status(500).send('添加失败');
  }
});

/**
 * GET 获取用户信息
 */
app.get('/userInfo/:useId', async (req, res) => {
  const { useId } = req.params;
  const sql = `SELECT * FROM user WHERE user_id = ?`;
  let [data] = await dB.query(sql, [useId]);
  res.send(data);
});

app.listen(3000, () => {
  console.log('serve is connect');
});
