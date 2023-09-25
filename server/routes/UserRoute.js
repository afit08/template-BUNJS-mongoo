import express from 'express';
import authJWT from '../helper/authJWT.js';
const router = express.Router();

import IndexController from '../controllers/IndexController.js';

router.get('/', IndexController.UserController.allUsers);
router.post('/store', IndexController.UserController.createUsers);
router.get('/:id', IndexController.UserController.oneUsers);
router.post('/signin', authJWT.authenticate, authJWT.login);
// router.post('/signin', IndexController.UserController.signin);
// router.post('/edit/:id', IndexController.RolesController.editRoles);
// router.delete('/:id', IndexController.RolesController.deleteRoles);

export default router;
