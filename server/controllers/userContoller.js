const Post = require('../models/Post');
const mongoose = require('mongoose');
const User = require('../models/User');
const { error, success } = require('../utils/responseWrapper');
const { userPostMap } = require('../utils/userPostFormat');
const cloudinary = require('cloudinary').v2;
// need to do
cloudinary.config({
  cloud_name: 'dbccqbdqz',
  api_key: '398291225275447',
  api_secret: 'A0UpBF5u4YcUD28jinn8o_IXefs',
});
const followOrUnfollowController = async (req, res) => {
  try {
    const { userIdToFollow } = req.body;
    const currUserId = req._id;

    if (userIdToFollow === currUserId) {
      return res.send(error(400, 'User cannot follow themselves'));
    }

    const userToFollow = await User.findById(userIdToFollow);
    const currUser = await User.findById(currUserId);

    if (!userToFollow || !currUser) {
      return res.send(error(404, 'User to follow not found'));
    }

    if (currUser.following.includes(userIdToFollow)) {
      const followingIdx = currUser.following.indexOf(userIdToFollow);
      currUser.following.splice(followingIdx, 1);

      const followerIdx = userToFollow.followers.indexOf(currUserId);
      userToFollow.followers.splice(followerIdx, 1);
    } else {
      userToFollow.followers.push(currUserId);
      currUser.following.push(userIdToFollow);
    }
    await userToFollow.save();
    await currUser.save();
    return res.send(success(200, { user: userToFollow }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const getPostOfFollowingController = async (req, res) => {
  try {
    const currUserId = req._id;
    const currUser = await User.findById(currUserId).populate('following');

    if (!currUser) {
      return res.send(error(404, 'User not found'));
    }
    // const posts = await Post.find({
    //   owner: { $in: currUser.following.map((user) => user._id) },
    // });
    const fullPosts = await Post.find({
      owner: {
        $in: currUser.following,
      },
    }).populate('owner');

    const posts = fullPosts.map((item) => userPostMap(item, req._id)).reverse();
    const followingsIds = currUser.following.map((item) => item._id);
    followingsIds.push(req._id);
    const suggestions = await User.find({
      _id: {
        $nin: followingsIds,
      },
    });
    return res.send(success(200, { ...currUser._doc, suggestions, posts }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const getMyPosts = async (req, res) => {
  try {
    const userId = req._id;
    // const currUser = await User.findById(userId).populate("posts");
    const allUserPost = await Post.find({ owner: userId }).populate('likes'); //-< give the all posts

    if (!allUserPost) {
      return res.send(error(404, 'User post not found'));
    }

    return res.send(success(200, { allUserPost }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.body;
    // const currUserId = req._id;
    if (!userId) {
      return res.send(error(400, 'user id is required'));
    }

    const allUserPost = await Post.find({ owner: userId }).populate('likes');
    // if (!user) {
    //     return res.send(error(404, "User not found"));
    // }

    // const isFollower = user.followers.includes(currUserId);
    // if (!isFollower) {
    //     return res.send(error(403, "You are not allowed to see the posts of this user"));
    // }
    // const userPosts = await Post.find({ owner: userId });
    return res.send(success(200, { allUserPost }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const deleteUserAccount = async (req, res) => {
  try {
    const userId = req._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.send(error(404, 'user not found'));
    }
    // delte the userpost bt userId
    await Post.deleteMany({ owner: userId });
    // delte user by the following
    for (const followerId of user.followers) {
      const follower = await User.findById(followerId);
      if (follower) {
        follower.following = follower.following.filter(
          (id) => id.toString() !== userId,
        );
        await follower.save();
      }
    }
    // delete thw user by follower
    for (const followingId of user.following) {
      const following = await User.findById(followingId);
      if (following) {
        following.followers = following.followers.filter(
          (id) => id.toString() !== userId,
        );
        await following.save();
      }
    }
    // delete the user inside the post likes
    const posts = await Post.find({ likes: userId });
    for (const post of posts) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
      await post.save();
    }

    // finally delte the user accound to the database
    await User.findByIdAndDelete(userId);

    res.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
    });
    return res.send(success(200, 'User account deleted successfully'));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const getMyinfo = async (req, res) => {
  try {
    const user = await User.findById(req._id);
    if (!user) {
      return res.send(error(404, 'User not fount'));
    }
    return res.send(success(200, { user }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userName, bio, userImg } = req.body;
    const user = await User.findById(req._id);
    if (!user) {
      return res.send(error(404, 'User not found'));
    }
    if (userName) {
      user.name = userName;
    }
    if (bio) {
      user.bio = bio;
    }
    if (userImg) {
      const uploadResult = await cloudinary.uploader.upload(userImg, {
        folder: 'profileImg',
      });
      user.avatar = {
        publicId: uploadResult.public_id,
        url: uploadResult.secure_url,
      };
    }
    await user.save();
    res.send(success(200, { user }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
const getUserProfile = async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!isValidObjectId(userId)) {
      return res.send(error(400, `Invalid user ID ${userId}`));
    }
    const user = await User.findById(userId).populate({
      path: 'posts',
      populate: {
        path: 'owner',
      },
    });
    const allPost = await user.posts;
    const posts = allPost.map((item) => userPostMap(item, req._id)).reverse();

    return res.send(success(200, { ...user._doc, posts }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

module.exports = {
  followOrUnfollowController,
  getPostOfFollowingController,
  getMyPosts,
  getUserPosts,
  deleteUserAccount,
  getMyinfo,
  updateProfile,
  getUserProfile,
};
