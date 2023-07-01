import express from 'express'
import controller from '../controllers/Book'
import { ValidateSchema, schemas } from '../middleware/ValidationSchema';

const router = express.Router();

router.post('/create', ValidateSchema(schemas.book.create), controller.createBook);
router.get('/:id', controller.findBook);
router.get('/', controller.findBooks);
router.patch('/update/:id', ValidateSchema(schemas.book.update), controller.updateBook);
router.delete('/delete/:id', controller.deleteBook);

export default router;