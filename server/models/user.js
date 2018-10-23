import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

import { serverSettings } from '../../config';

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
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
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

userSchema.pre('save', function(next) {
  const $this = this;
  if (!$this.isModified || !$this.isNew) {
    next();
  } else {
    bcrypt
      .hash($this.password, serverSettings.saltingRounds)
      .then(hash => {
        $this.password = hash;
        next();
      })
      .catch(err => next(err));
  }
});

export default mongoose.model('User', userSchema);
