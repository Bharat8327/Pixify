const User = require("../models/User");
const { success, error } = require("../utils/responseWrapper");
const Post = require("../models/Post");

const createPostController = async(req,res)=>{
        try {
            const {caption} = req.body;
            const owner = req._id;
            if(!caption){
                return res.send(error(400,"caption required"));
            }
            const user = await User.findById(req._id);
            
            const post  = await Post.create({
                owner,
                caption    
            })

            user.posts.push(post._id);
            await user.save();
            return res.send(success(201,post));
        } catch (e) {
           return res.send(error(500,e.message));
        }
}


const likeUnlikePostController = async (req,res)=>{
    try {
        const {postId} = req.body;
        const currentUserId = req._id;

        const post  = await Post.findById(postId);
        if(!post){
            return res.send(error(404,"post not found"));
        }
        if(post.likes.includes(currentUserId)){
             const idx = post.likes.indexOf(currentUserId);
            post.likes.splice(idx,1);
            await post.save();
            return res.send(success(200,"post unliked"));
        }else{
            post.likes.push(currentUserId);
            await post.save();
            return res.send(success(200,"post liked"));
        }

    } catch (e) {
        return res.send(error(500,e.message));
    }
}



const updatePostController = async(req,res)=>{
    try {
        
        const {postId,caption} = req.body;
        const currUserId = req._id;

        // if(!postId || !caption){
        //     return res.send(error(400, "postId and caption are required"));
        // }

        const post = await Post.findById(postId);

        if(!post){
            return res.status(error(404,"post not found"));
        }

        if(post.owner.toString()!==currUserId){
            return res.send(error(403,"only owners can update and delete the post"))
        }
        
        if(caption){
            post.caption = caption;
        }
        await post.save();
        return res.send(success(200,{post}))
    } catch (e) {
        return res.send(error(500,e.message));
    }

}

const deletePostController = async (req,res)=>{

    try {
        const {postId} = req.body;
        const currUserId = req._id;
        const post = await Post.findById(postId);
        if(!post){
            return res.send(error(404,"post not found"));
        }   
        const currUser = await User.findById(currUserId);
        if(post.owner.toString()!==currUserId){
            return res.send(error(403,"Only owners can delete their posts"));
        }

        const idx = currUser.posts.indexOf(postId);
        currUser.posts.splice(idx,1);
        await currUser.save();
        await post.deleteOne();
        return res.send(success(200,"post deleted successfully"));
    } catch (e) {
            return res.send(error(500,e.message));
    }
}


module.exports = {
    createPostController,
    likeUnlikePostController,
    updatePostController,
    deletePostController
};   