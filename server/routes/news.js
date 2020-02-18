import express from 'express';

import { deleteNewsById, getNews, getNewsById, patchNewsById, postNews } from '../controllers/News';


const router = express.Router();

router.get('/', getNews);
router.post('/', postNews);
router.get('/:id', getNewsById);
router.patch('/:id', patchNewsById);
router.delete('/:id', deleteNewsById);

export default router;
