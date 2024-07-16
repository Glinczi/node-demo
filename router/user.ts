import express from 'express';
import { PrismaClient } from '@prisma/client';
import { BodyParserLikeRequest } from 'http-proxy-middleware/dist/handlers/fix-request-body';
const prisma = new PrismaClient();
const router = express.Router();

// 新增
router.post('/add', async (req: BodyParserLikeRequest, res) => {
  const user = req.body as {
    userName: string;
    age: number;
    email: string;
    password: string;
    cars: Array<{ brand: string }>;
  };
  await prisma.user.create({
    data: {
      user_name: user.userName,
      age: user.age,
      email: user.email,
      password: user.password,
      Car: {
        createMany: {
          data : user.cars
        }
      },
    }
  })
  res.send('添加成功');
});
// 删除
router.delete('/remove', async (req: BodyParserLikeRequest, res) => {
  const { userId } = req.body;
  await prisma.user.delete({
    where: {
      id: Number(userId),
    },
  });
  res.send('删除成功');
});

// 修改
// router.update('/update', async (req: BodyParserLikeRequest, res) => {
//   const { userId, userName, age, email, password } = req.body;
//   await prisma.user.update({
//     where: {
//       id: Number(userId),
//     },
//     data: {
//       user_name: userName,
//       age,
//       email,
//       password,
//     },
//   });
//   res.send('修改成功');
// });

// 查询
router.get('/search', async (req, res) => {
  const { userId } = req.query;
  let userInfo = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
    select: {
      user_name: true,
      age: true,
      Car: {
        select: {
          brand: true,
        },
      },
    },
  });
  res.send(userInfo);
});

export default router;
