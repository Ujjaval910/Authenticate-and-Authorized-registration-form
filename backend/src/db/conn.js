const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/youtubeRegistration", {
    useNewUrlParser:true,
    useUnifiesTopology:true,
    useCreareIndex:true
}).then(() => {
    console.log(`connection successful`);
}).catch((e) => {
    console.log(`no connection`);
})