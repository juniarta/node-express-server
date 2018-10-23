import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 9009,
  saltingRounds: 10
};
