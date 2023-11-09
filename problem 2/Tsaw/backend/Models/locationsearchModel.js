const mongoose = require("mongoose");

const locationSearchSchema = new mongoose.Schema({
    from: {
        type: String, 
        required: true,
    },
    to: {
        type: String,  
        required: true,
    },
});

const locationSearchModel = mongoose.model("location1", locationSearchSchema);  

module.exports = locationSearchModel;
