const Issue = require("../models/Issue");
const Vote = require("../models/Vote");
const jwt = require = ("jsonwebtoken");

//this is how an issue is created logic
const createIssue = async (req, res) => {
  try {
    const { title, description, category, addressText, longitude, latitude } = req.body;

    if (!title || !description || !category || !longitude || !latitude) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const issue = await Issue.create({
      title,
      description,
      category,
      addressText,
      imageUrl: req.file ? req.file.path : "",
      reportedBy: req.user._id,
      location: {
        type: "Point",
        coordinates: [Number(longitude), Number(latitude)], // here i write Number bcuz in multerpart/form-data , even numbers comes as string.
      },
    });

    res.status(201).json({
      message: "Issue created successfully",
      issue,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//this is to get users
const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find()
      .populate("reportedBy", "name email")
      .sort({ createdAt: -1 });

    let votedIssueIds = [];

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const token = req.headers.authorization.split(" ")[1];

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const votes = await Vote.find({ user: decoded.id }).select("issue");
        votedIssueIds = votes.map((vote) => vote.issue.toString());
      } catch (error) {
        votedIssueIds = [];
      }
    }

    const issuesWithVoteStatus = issues.map((issue) => {
      const issueObj = issue.toObject();
      issueObj.hasUpvoted = votedIssueIds.includes(issue._id.toString());
      return issueObj;
    });

    res.status(200).json({ issues: issuesWithVoteStatus });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id).populate("reportedBy", "name email");

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    res.status(200).json({ issue });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//by this user can see their own reported issues.
const getMyIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ reportedBy: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({ issues });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// this is for to update an issue
const updateIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    if (issue.reportedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this issue" });
    }

    const allowedFields = ["title", "description", "category", "location", "addressText"];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        issue[field] = req.body[field];
      }
    });

    const updatedIssue = await issue.save();

    res.status(200).json({
      message: "Issue updated successfully",
      issue: updatedIssue,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// this is delete an issue logic
const deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    if (issue.reportedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this issue" });
    }

    await issue.deleteOne();

    res.status(200).json({ message: "Issue deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// this is upvote logic
const upvoteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    if (issue.reportedBy.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot upvote your own issue" });
    }

    const existingVote = await Vote.findOne({
      user: req.user._id,
      issue: issue._id,
    });

    if (existingVote) {
      return res.status(400).json({ message: "You have already upvoted this issue" });
    }

    await Vote.create({
      user: req.user._id,
      issue: issue._id,
    });

    issue.upvotesCount += 1;
    if (issue.upvotesCount >= 3 && issue.status !== "escalated") {
      issue.status = "escalated";
      issue.escalatedAt = new Date();
      issue.escalationMessage = `Civic Alert: "${issue.title}" at ${issue.addressText || "the reported location"} has crossed ${issue.upvotesCount} community upvotes. Local authorities are requested to take action. #LokSetu`;
    }
    await issue.save();

    res.status(200).json({
      message: "Issue upvoted successfully",
      upvotesCount: issue.upvotesCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//this is the remove vote  logic
const removeUpvote = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    const existingVote = await Vote.findOne({
      user: req.user._id,
      issue: issue._id,
    });

    if (!existingVote) {
      return res.status(400).json({ message: "You have not upvoted this issue" });
    }

    await existingVote.deleteOne();

    issue.upvotesCount = Math.max(0, issue.upvotesCount - 1);
    await issue.save();

    res.status(200).json({
      message: "Upvote removed successfully",
      upvotesCount: issue.upvotesCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//this is for update issue's status by admin
const updateIssueStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = ["open", "in_progress", "resolved", "escalated"];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    issue.status = status;
    await issue.save();

    res.status(200).json({
      message: "Issue status updated successfully",
      issue,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createIssue, getAllIssues, getIssueById, getMyIssues, deleteIssue, updateIssue, upvoteIssue, removeUpvote, updateIssueStatus };
