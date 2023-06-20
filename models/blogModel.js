import mongoose from "mongoose";

// Create a schema for the blog model
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  numViews: {
    type: Number,
    default: 0,
  },
  isLiked: {
    type: Boolean,
    default: false,
  },
  isDisliked: {
    type: Boolean,
    default: false,
  },
  likes: [
    {
type: mongoose.Schema.Types.ObjectId,
ref : "User",
    }
  ],
  disLikes: [
    {
type: mongoose.Schema.Types.ObjectId,
ref : "User",
    }
  ],
image:{
    type: String,
    default: "https://media.tacdn.com/media/attractions-splice-spp-674x446/09/c3/33/97.jpg"
},

author: {
    type: String,
    default: "Admin"
},

},
{
    toJSON:{
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
    timestamps: true 
}
);

// Create the blog model using the schema
const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
