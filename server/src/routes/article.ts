import express from 'express';

import { deleteArticleById, getArticleById, getArticles, patchArticleById, postArticle } from '../controllers/Article';


const router = express.Router();

router.get('/', getArticles);
router.post('/', postArticle);
router.get('/:id', getArticleById);
router.patch('/:id', patchArticleById);
router.delete('/:id', deleteArticleById);

export default router;
