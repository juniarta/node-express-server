import {
  createCtrl,
  getAllCtrl,
  getIdCtrl,
  patchCtrl,
  deleteCtrl
} from '../controllers/article';

export const createMid = (req, res, next) => {
  createCtrl(req.body)
    .then(data => {
      res.status(200).json({
        message: 'New article has been created',
        data: data
      });
    })
    .catch(err => {
      next(err);
    });
};

export const getAllMid = (req, res, next) => {
  getAllCtrl()
    .then(data => {
      res.status(200).json({ data });
    })
    .catch(err => {
      next(err);
    });
};

export const getIdMid = (req, res, next) => {
  getIdCtrl(req.params.id)
    .then(data => {
      res.status(200).json({ data });
    })
    .catch(err => {
      next(err);
    });
};

export const patchMid = (req, res, next) => {
  patchCtrl(req.params.id, req.body)
    .then(data => {
      res.status(200).json({ data });
    })
    .catch(err => {
      next(err);
    });
};

export const deleteMid = (req, res, next) => {
  deleteCtrl(req.params.id)
    .then(data => {
      res.status(200).json({ data });
    })
    .catch(err => {
      next(err);
    });
};
