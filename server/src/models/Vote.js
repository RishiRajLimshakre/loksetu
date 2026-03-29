const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },
        issue: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Issue",
            required: true,
        },
    },
    {timestamps: true}
);

voteSchema.index({user:1, issue:1 }, {unique: true}) // by applying this , only one user can vote one issue only once


module.exports = mongoose.model("Vote", voteSchema);