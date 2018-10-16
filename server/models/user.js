import mongoose from 'mongoose';

const user = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model('User', user);
