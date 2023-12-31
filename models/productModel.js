import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: { type: String,
             required: true,
              unique: true,
              lowercase: true,
             },
        
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },

        quantity: {
            type: Number,
            required: true,

        },
        sold: {
            type: Number,
            default: 0,
        },

        brand: {
            type: String,
            required : true
        },

        color: [],
        tags: [],
        images: [],
    ratings: [
            {
                star: Number,
                comment: String,
                postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            },
        ],

  totalrating:{
type: String,
default : 0,
  },

    
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
