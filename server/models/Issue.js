import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["Pending", "In Progress", "Resolved"],
        default: "Pending"
    },

    date: {
        type: Date,
        default: Date.now
    }

});

const Issue = mongoose.model("Issue", issueSchema);

export default Issue;