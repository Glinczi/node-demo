import express from 'express';
import { PrismaClient } from '@prisma/client';
import { BodyParserLikeRequest } from 'http-proxy-middleware/dist/handlers/fix-request-body';
const prisma = new PrismaClient();
const router = express.Router();

// 新增
router.post('/add', async (req: BodyParserLikeRequest, res) => {
  const { brand, userId } = req.body;
  await prisma.car.create({
    data: {
      brand,
      driver_id: Number(userId),
    },
  });
  res.send('添加成功');
});
// 删除
// router.delete('/removeByUserId', async (req: BodyParserLikeRequest, res) => {
//   const { userId } = req.body;
//   await prisma.car.delete({
//     where: {
//       id: Number(userId),
//     },
//   });
//   res.send('删除成功');
// });

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
router.get('/searchByUserId', async (req, res) => {
  const { userId } = req.query;
  const cars = await prisma.car.findMany({
    where:{
      driver_id: Number(userId)
    },
    select: {
      brand: true,
    }
  })

});

export default router;
