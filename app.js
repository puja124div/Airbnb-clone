const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const Listing = require("./model/listing.js");
const path = require("path");
const methodoverirde=require("method-override");
const ejsmate=require("ejs-mate");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodoverirde("_method"));
app.engine("ejs",ejsmate);
app.use(express.static(path.join(__dirname,"public")))


main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log("failed => ", err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

app.get("/listing", async (req, res) => {
  const allListing = await Listing.find({});
  //  console.log(allListing);
  res.render("./listing/index.ejs", { allListing });
});

app.get("/listing/new",(req,res)=>{
    res.render("./listing/new.ejs");
})

app.get("/listing/:id", async (req, res) => {
  let { id } = req.params;
  // let  id  = req.params;
//  const listing = await Listing.findById(id.id);
  const listing = await Listing.findById(id);
//   console.log(listing);
  res.render("./listing/show.ejs", { listing });
});

// app.get("/test",(req,res)=>{
//     console.log("hy");
// const samplelisting = new Listing({
//     title:"divya",
//     description:"she is very bad",
//     image:234,
//     country:"india",
//     location:"delhi"
// })
// samplelisting.save();
// // console.log("sample was saved");
// res.send("successfully tested");
// })

app.post("/listing/new",async (req,res)=>{

    const newlisting =await new Listing(req.body.listing);
    newlisting.save();
    res.redirect("/listing");
})
app.get("/listing/:id/edit",async (req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id);
    //console.log(listing);
    res.render("./listing/edit.ejs",{listing});
})
app.put("/listing/:id",async (req,res)=>{
    let {id}=req.params;
await  Listing.findByIdAndUpdate(id,{...req.body.listing});
res.redirect(`/listing/${id}`);

});
app.delete("/listing/:id",async (req,res)=>{
    let {id}= req.params;
    const d= await Listing.findByIdAndDelete(id);
    console.log(d);
    res.redirect("/listing");
})

app.get("/listing", (req, res) => {
  res.send("hy");
});

app.get("/",(req,res)=>{
  res.send('hello world')
})

app.listen(3000, () => {
  console.log("server is running at 3000");
});
