const express = require('express')
const router = express.Router();
const ctrl = require('../../controllers/contacts')
const { ctrlWrapper } = require('../../helpers');
const isValidId = require('../../middlewares/isValidId');
const authenticate = require('../../middlewares/authenticate');

router.get('/',authenticate, ctrlWrapper(ctrl.getAll));

router.get('/:contactId', authenticate, isValidId, ctrlWrapper(ctrl.getById));

router.post('/', authenticate,  ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', authenticate, isValidId, ctrlWrapper(ctrl.deleteContact));

router.put('/:contactId', authenticate, isValidId, ctrlWrapper(ctrl.updateContact));

router.patch('/:contactId/favorite', authenticate, isValidId, ctrlWrapper(ctrl.updateStatusContact));

module.exports = router;
