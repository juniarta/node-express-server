import mongoose from 'mongoose';

import Article from '../../models/article';

export const createCtrl = ({ title, text, author }) => {
  if (!title) {
    throw new Error({
      code: 422,
      message: 'TITLE is required'
    });
  }

  if (!text) {
    throw new Error({
      code: 422,
      message: 'TEXT is required'
    });
  }

  if (!author) {
    throw new Error({
      code: 422,
      message: 'AUTHOR is required'
    });
  }

  const finalArticle = new Article({
    _id: new mongoose.Types.ObjectId(),
    title: title,
    text: text,
    author: author,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  return finalArticle
    .save()
    .then(() => ({ finalArticle }))
    .catch(err => err);
};

export const getAllCtrl = () => {
  return Article.find()
    .sort({ createdAt: 'descending' })
    .then(articles => articles)
    .catch(err => err);
};

export const getIdCtrl = id => {
  return Article.findById(id)
    .then(article => article)
    .catch(err => err);
};

export const patchCtrl = (id, { title, text }) => {
  if (!title) {
    throw new Error({
      code: 422,
      message: 'TITLE is required'
    });
  }

  if (!text) {
    throw new Error({
      code: 422,
      message: 'TEXT is required'
    });
  }

  return Article.findById(id)
    .then(article => {
      article.title = title;
      article.text = text;
      article.updatedAt = new Date();
      return article.save();
    })
    .then(finalArticle => finalArticle)
    .catch(err => err);
};

export const deleteCtrl = id => {
  return Article.findByIdAndRemove(id)
    .then(() => {
      return { message: 'Articolo eliminato' };
    })
    .catch(err => err);
};
