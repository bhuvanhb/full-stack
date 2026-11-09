import express from "express";
import Issue from "../models/issue.js";
import mongoose from "mongoose";

const router = express.Router();

// Get all issues
router.get("/", async (req, res) => {
    try {
        const issues = await Issue.find().sort({ date: -1 });
        res.json(issues);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching issues"
        });
    }
});

// Add new issue
router.post("/", async (req, res) => {
    try {
        const { title, category, location, description } = req.body;

        if (![title, category, location, description]
            .every(value => typeof value === "string" && value.trim())) {
            return res.status(400).json({
                message: "Please fill all fields"
            });
        }

        const issue = new Issue({
            title,
            category,
            location,
            description
        });

        await issue.save();

        res.status(201).json(issue);

    } catch (error) {
        res.status(500).json({
            message: "Error adding issue"
        });
    }
});

// Update issue status
router.put("/:id", async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid issue ID"
            });
        }

        const issue = await Issue.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true, runValidators: true }
        );

        if (!issue) {
            return res.status(404).json({
                message: "Issue not found"
            });
        }

        res.json(issue);

    } catch (error) {
        res.status(500).json({
            message: "Error updating issue"
        });
    }
});

// Delete issue
router.delete("/:id", async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid issue ID"
            });
        }

        const issue = await Issue.findByIdAndDelete(req.params.id);

        if (!issue) {
            return res.status(404).json({
                message: "Issue not found"
            });
        }

        res.json({
            message: "Issue deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting issue"
        });
    }
});

export default router;