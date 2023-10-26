const mongoose = require("mongoose");
const initdata= require("./data.js")
const Listing= require("../model/listing.js")



main()
.then (()=>{
console.log("connected to db");
})
.catch((err)=>{
    console.log("failed => ",err);
})


 async function main (){
  await  mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initdb= async ()=>{
 await Listing.deleteMany({})
await  Listing.insertMany(initdata.data)
 console.log("data was initialized");

}
initdb();
