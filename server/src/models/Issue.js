const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            enum: ["pothole", "garbage", "streetlight", "drainage", "water_leakage"],
        },
        imageUrl: {
            type: String,
            default: "",
        },
        reportedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        location: {
            type: {
                type: String,
                enum: ["Point"],
                default: "Point",
            },
            coordinates: {
                type: [Number],
                required: true,
            },
        },
        addressText: {
            type: String,
            default: "",
            trim: true,
        },
        status: {
            type: String,
            enum: ["open", "in_progress", "resolved", "escalated"],
            default: "open",
        },
        upvotesCount: {
            type: Number,
            default: 0,
        },
        escalatedAt: {
            type: Date,
            default: null,
        },
        escalationMessage: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

issueSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Issue", issueSchema);