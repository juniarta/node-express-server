require('dotenv').config();

export default {
  port: process.env.PORT || 9009,
  session: {
    secret: process.env.SESSION_SECRET
  },
  cookie: {
    name: 'test'
  }
};
