import mongoose from "mongoose";

const whatsappSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received: Boolean,
});

//Setting up collection and data structure 
export default mongoose.model("messagecontents", whatsappSchema)