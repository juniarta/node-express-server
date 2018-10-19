import mongoose from 'mongoose';

import Article from '../models/article';

export const createCtrl = ({ title, text, author }) =>
  new Promise((resolve, reject) => {
    !title &&
      reject({
        status: 422,
        message: 'TITLE is required'
      });

    !text &&
      reject({
        status: 422,
        message: 'TEXT is required'
      });

    !author &&
      reject({
        status: 422,
        message: 'AUTHOR is required'
      });

    const finalArticle = new Article({
      _id: new mongoose.Types.ObjectId(),
      title: title,
      text: text,
      author: author,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    finalArticle
      .save()
      .then(article => resolve(article))
      .catch(err => reject(err));
  });

export const getAllCtrl = () => {
  return Article.find()
    .sort({ createdAt: 'descending' })
    .then(articles => articles)
    .catch(err => err);
};

export const getIdCtrl = id =>
  new Promise((resolve, reject) => {
    Article.findById(id, (err, article) => {
      (err || !article) &&
        reject({ status: 404, message: 'Article not found' });
      resolve(article);
    });
  });

export const patchCtrl = (id, { title, text, author }) =>
  new Promise((resolve, reject) => {
    !title &&
      reject({
        status: 422,
        message: 'TITLE is required'
      });

    !text &&
      reject({
        status: 422,
        message: 'TEXT is required'
      });

    !author &&
      reject({
        status: 422,
        message: 'AUTHOR is required'
      });

    Article.findById(id, (err, data) => {
      (err || !data) && reject({ status: 404, message: 'Article not found' });
      if (data) {
        data.title = title;
        data.text = text;
        data.updatedAt = new Date();
        return data.save();
      }
    }).then(article => resolve(article));
  });

export const deleteCtrl = id =>
  new Promise((resolve, reject) => {
    Article.findByIdAndDelete(id, (err, article) => {
      (err || !article) &&
        reject({ status: 404, message: 'Article not found' });
      resolve({ message: 'Article deleted successfully', article });
    });
  });
