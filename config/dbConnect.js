import mongoose from "mongoose";

mongoose.connect("mongodb+srv://alura:123@alura-node.glvmajy.mongodb.net");

let db = mongoose.connection;
export default db;