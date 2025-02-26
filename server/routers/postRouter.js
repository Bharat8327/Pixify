const router = require('express').Router();
const postControllers = require('../controllers/postControllers');
const requireUser = require('../middlewares/requireUser');

router.post('/', requireUser, postControllers.createPostController);
router.post('/like', requireUser, postControllers.likeUnlikePostController);
router.put('/', requireUser, postControllers.updatePostController);
router.delete('/', requireUser, postControllers.deletePostController);
module.exports = router;
