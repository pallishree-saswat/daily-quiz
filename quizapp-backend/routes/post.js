const express = require("express");

const router = express.Router();

// controllers
const {
  postQuestion,
  questions,
  viewCount,
  questionDelete,
  questionsCount,
  AllQuestions,
  editQuestion
} = require("../controllers/post");
const { requireSignin } = require("../controllers/auth");

router.post("/post-question", requireSignin, postQuestion);
router.get("/questions/:page", questions);
router.get("/questions", AllQuestions);
router.get("/questions-count", questionsCount);
router.put("/edit-question/:questionId", editQuestion);
router.put("/view-count/:questionId", viewCount);
router.delete("/question-delete/:questionId", requireSignin, questionDelete);

module.exports = router;
