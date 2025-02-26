const UserContoller = require('../controllers/userContoller');
const requireUser = require('../middlewares/requireUser');

const router = require('express').Router();

router.post('/follow', requireUser, UserContoller.followOrUnfollowController);
router.post(
  '/getPostOfFollowing',
  requireUser,
  UserContoller.getPostOfFollowingController,
);
router.get('/getUserpost', requireUser, UserContoller.getUserPosts);
router.get('/getMyPost', requireUser, UserContoller.getMyPosts);
router.delete('/', requireUser, UserContoller.deleteUserAccount);
router.get('/info', requireUser, UserContoller.getMyinfo);
router.put('/update', requireUser, UserContoller.updateProfile);
router.post('/getUserProfile', requireUser, UserContoller.getUserProfile);

module.exports = router;
