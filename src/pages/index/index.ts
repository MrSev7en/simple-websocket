import express from 'express';
import path from 'path';

const router = express.Router();

router.get('', async (req: any, res: any): Promise<void> => {
  res.sendFile(path.join(__dirname, '..', '..', 'html', 'index', 'index.html'));
});

export default router;
