const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    image: {
      publicId: String,
      url: String,
    },
    caption: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    // comments :[
    //     {
    //         comment :String,
    //         commentedBy:{
    //             type :mongoose.Schema.Types.ObjectId,
    //             ref : 'user'
    //         }
    //     }
    // ]
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('post', postSchema);
// The above snippet creates a schema for posts. The schema contains the following fields:
