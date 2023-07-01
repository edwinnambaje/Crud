import express from 'express'
import controller from '../controllers/Author'
import { ValidateSchema, schemas } from '../middleware/ValidationSchema';

const router = express.Router();

router.post('/create', ValidateSchema(schemas.author.create), controller.createAuthor);
router.get('/:id', controller.findAuthor);
router.get('/', controller.findAuthors);
router.patch('/update/:id', ValidateSchema(schemas.author.update), controller.updateAuthor);
router.delete('/delete/:id', controller.deleteAuthor);

export default router;