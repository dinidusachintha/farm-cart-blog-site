import mongoose  from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://imashi:ima1234@test1.n9dxa8d.mongodb.net/ITP?retryWrites=true&w=majority&appName=Test1').then(()=>console.log("DB Connencted"));
}