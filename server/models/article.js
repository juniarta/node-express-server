import mongoose from 'mongoose';

const article = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    text: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model('Article', article);
