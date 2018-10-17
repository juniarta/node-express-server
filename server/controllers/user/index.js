import { promisify } from 'util';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const bcryptCompare = promisify(bcrypt.compare);
const bcryptHash = promisify(bcrypt.hash);

import User from '../../models/user';

export const registerCtrl = ({ email, password }) => {};

export const loginCtrl = ({ email, password }) => {};

export const logoutCtrl = session => {};
// new Promise((resolve, reject) => {
//   session.destroy(err => {
//     if (err) {
//       reject(err);
//     } else {
//       resolve();
//     }
//   });;
