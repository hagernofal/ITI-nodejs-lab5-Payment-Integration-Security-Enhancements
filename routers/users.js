const express = require('express');
const usersController = require('../controllers/users');
const schemas = require('../schemas');
const validate = require('../middlewares/validate');
const authenticate = require('../middlewares/authenticate');
const restrictTo = require('../middlewares/restrictTo');
const router = express.Router();


router.post('/sign-up', validate(schemas.signUpSchema), usersController.signUp);
router.post('/sign-in', validate(schemas.signInSchema), usersController.signIn);

router.get('/', authenticate, restrictTo(['admin']), validate(schemas.getAllUsersSchema), usersController.getAllUsers);

router.get('/:id',authenticate, restrictTo('admin') ,usersController.getUserById);

router.patch('/:id', authenticate, restrictTo('admin'),validate(schemas.updateUserSchema), usersController.updateUserById);

router.delete('/:id',authenticate, restrictTo('admin'), usersController.deleteUserById);


module.exports = router;