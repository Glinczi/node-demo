import { Router } from 'express';

const router = Router();

router.get('/userInfo', (req, res) => {
  res.send('my name is xz')
});

export default router;