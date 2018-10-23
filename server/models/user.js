import mongoose from 'mongoose';
import validator from 'validator';

mongoose.set('useCreateIndex', true);

const user = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required!'],
      trim: true,
      validate: {
        validator(email) {
          return validator.isEmail(email);
        },
        message: '{VALUE} is not a valid email!'
      }
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
      trim: true,
      min: [6, 'Password need to be longer!']
    },
    firstName: {
      type: String,
      trim: true
    },
    lastName: {
      type: String,
      trim: true
    },
    userName: {
      type: String,
      min: [3, 'UserName need to be at leat 3 characters longer!'],
      trim: true,
      unique: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('User', user);
