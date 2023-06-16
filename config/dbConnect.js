import mongoose from "mongoose"

const dbConnection = ()=>{
    try{
        mongoose.connect(process.env.MONGO_SERVER)

    }catch(error){
        throw new Error("Could not connect to MongoDB server", error)
    }
}

export default dbConnection;