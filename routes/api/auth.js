const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/auth');
const { ctrlWrapper } = require('../../helpers');
const validateBody = require('../../middlewares/validateBody');
const { userSchema } = require('../../models/users');
const { verifyEmailSchema } = require('../../models/users');
const authenticate = require('../../middlewares/authenticate');
const upload = require('../../middlewares/upload');


router.post('/signup', validateBody(userSchema), ctrlWrapper(ctrl.register));

router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verify));

router.post('/verify', validateBody(verifyEmailSchema), ctrlWrapper(ctrl.resendVerify));

router.post('/login', validateBody(userSchema), ctrlWrapper(ctrl.login));

router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent));

router.get('/logout', authenticate, ctrlWrapper(ctrl.logout));

router.patch('/:id/subscription', authenticate, ctrlWrapper(ctrl.updateSubscription));

router.patch('/avatars', authenticate, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));

module.exports = router;