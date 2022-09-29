const express = require('express')
const router = express.Router();
const ctrl = require('../../controllers/contacts')
const { ctrlWrapper } = require('../../helpers');
const isValidId = require('../../middlewares/isValidId');

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getById));

router.post('/', ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.deleteContact));

router.put('/:contactId', isValidId, ctrlWrapper(ctrl.updateContact));

router.patch('/:contactId/favorite', isValidId, ctrlWrapper(ctrl.updateStatusContact));

module.exports = router
