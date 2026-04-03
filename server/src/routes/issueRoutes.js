const express = require("express");
const {createIssue, getAllIssues, getIssueById, getMyIssues , updateIssue, deleteIssue, upvoteIssue, removeUpvote, updateIssueStatus} = require("../controllers/issueController");
const { protect} = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const {adminOnly} = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/", protect, upload.single("image"), createIssue);
router.get("/", getAllIssues); 
router.get("/my/issues", protect, getMyIssues); // here i put this before /:id, bcuz in express static routes come before dynamic routes. (and also if i don't then express may treat it as my/issue)
router.get("/:id", getIssueById);
router.patch("/:id/status", protect, adminOnly, updateIssueStatus);
router.patch("/:id", protect, updateIssue);
router.delete("/:id", protect, deleteIssue); 
router.post("/:id/upvote", protect, upvoteIssue);
router.delete("/:id/upvote", protect, removeUpvote);


module.exports = router;