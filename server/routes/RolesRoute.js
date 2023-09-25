import express from 'express';
const router = express.Router();

import IndexController from '../controllers/IndexController.js';

router.get('/', IndexController.RolesController.allRoles);
router.post('/store', IndexController.RolesController.createRoles);
router.get('/:id', IndexController.RolesController.oneRoles);
router.post('/edit/:id', IndexController.RolesController.editRoles);
router.delete('/:id', IndexController.RolesController.deleteRoles);

export default router;
