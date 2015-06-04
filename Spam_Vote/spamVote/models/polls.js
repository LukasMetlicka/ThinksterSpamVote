var mongoose = require("mongoose");

var PollsSchema = new mongoose.Schema({

    title: String,
    redVotes: {type: Number, default: 0},
    blueVotes: {type: Number, default: 0}

})

mongoose.model("Polls", PollsSchema);