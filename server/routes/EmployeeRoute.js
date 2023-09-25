import express from 'express';
const router = express.Router();

import IndexController from '../controllers/IndexController.js';
// import UploadFile from '../'
// const UploadFile = require('../minddleware/upload');

router.get('/', IndexController.EmployeeController.index);
router.get('/:id', IndexController.EmployeeController.show);
router.post('/store', IndexController.EmployeeController.store);
router.post('/update/:id', IndexController.EmployeeController.update);
router.delete('/delete/:id', IndexController.EmployeeController.destroy);
router.post(
  '/store_file',
  //   UploadFile.single('avatar'),
  IndexController.EmployeeController.store_file,
);
router.post(
  '/store_file_multi',
  //   UploadFile.array('avatar[]'),
  IndexController.EmployeeController.store_file_multi,
);

export default router;
