const ta = require('time-ago');
const userPostMap = (post, userId) => {
  const createdAtDate = new Date(post.createdAt);
  return {
    _id: post._id,
    caption: post.caption,
    image: post.image,
    owner: {
      _id: post.owner._id,
      name: post.owner.name,
      avatar: post.owner.avatar,
    },
    likesCount: post.likes.length,
    isLiked: post.likes.includes(userId),
    timeago: ta.ago(createdAtDate), // Ensure createdAt is a valid date
  };
};

module.exports = { userPostMap };
