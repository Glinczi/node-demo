import express from 'express';
import { PrismaClient } from '@prisma/client';
import { BodyParserLikeRequest } from 'http-proxy-middleware/dist/handlers/fix-request-body';
const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// 新增
app.post('/add', async (req: BodyParserLikeRequest, res) => {
  const { userName, age, email, password } = req.body;
  await prisma.user.create({
    data: {
      user_name: userName,
      age,
      email,
      password,
    },
  });
  res.send('添加成功');
});
// 删除

// 修改

// 查询

app.listen(3000, () => {
  console.log('serve is ready');
});
