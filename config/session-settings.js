import dotenv from 'dotenv';
dotenv.config();

export default {
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    duration: 30 * 60 * 1000, // 30 minutes
    activeDuration: 5 * 60 * 1000, // 5 minutes
    maxAge: 60 * 60 * 1000, // 60 minutes
    secure: true,
    httpOnly: true,
    ephemeral: true
  }
};
