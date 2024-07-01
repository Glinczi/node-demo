import { Router } from 'express';

const router = Router();

router.get('/sendSmsCode', (req, res) => {
  res.send('code is 999')
});

export default router;