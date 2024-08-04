import Comment from '../models/commentModel.js';

// Create Comment
export const createMessage = async (req, res, next) => {
  const newMessage = new Comment(req.body);
  try {
    const comment = await newMessage.save();

    res.status(201).json(comment);
  } catch (error) {
    console.log(error);
  }
};

// Get all Comments
export const getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
  }
};

// Delete a single Comment
export const deletComment = async (req, res, next) => {
  try {
    const commenter = await Comment.findById(req.params.id)
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json(`Comment of ${commenter.firstName} ${commenter.lastName} has been successfully deleted!`);
  } catch (error) {
    console.log(error);
  }
};
