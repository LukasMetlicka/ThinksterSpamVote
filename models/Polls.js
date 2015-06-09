var mongoose = require("mongoose");

var PollsSchema = new mongoose.Schema({

    title: String,
    redVotes: {type: Number, default: 0},
    blueVotes: {type: Number, default: 0}

});

PollsSchema.methods.redUpvote = function(cb){
    this.redVotes++;
    this.save(cb);
};

PollsSchema.methods.blueUpvote = function(cb){
    this.blueVotes++;
    this.save(cb);
};
PollsSchema.methods.delete = function(cb){
  this.remove();
    this.save(cb);
};
mongoose.model("Poll", PollsSchema);