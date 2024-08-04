import express from 'express';
import {
  createMessage,
  deletComment,
  getAllComments,
} from '../controllers/commentController.js';
import requiredValues from '../validators/requiredValues.js';
import commentValidator from '../validators/commentValidator.js';
import checkValidation from '../validators/checkValidation.js';

// Comment Router
const commentRouter = express.Router();

// Comment Routes
commentRouter.post(
  '/createComment',
  requiredValues(['firstName', 'lastName', 'email', 'file', 'message']),
  commentValidator(),
  checkValidation,
  createMessage
);
commentRouter.get('/', getAllComments);
commentRouter.delete('/:id', deletComment);

// Export comment router
export default commentRouter;
