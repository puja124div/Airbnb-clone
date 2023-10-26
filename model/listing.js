const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingschema = new Schema({
    title:String,
    description:String,
    image: {
        type: String,
        default:
          "https://unsplash.com/photos/a-long-exposure-photo-of-a-city-street-at-night-Npihx4Gp0sU",
        set: (v) =>
          v === ""
            ? "https://unsplash.com/photos/a-long-exposure-photo-of-a-city-street-at-night-Npihx4Gp0sU" : v
     },
    price:Number,
    country:String,
    location:String
})


const Listing = mongoose.model("Listing",listingschema);

module.exports=Listing;