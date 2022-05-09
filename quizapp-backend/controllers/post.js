const Question = require("../models/post");

exports.postQuestion = async (req, res) => {
  try {
    const question = await new Question({
      ...req.body,
      postedBy: req.user._id,
    }).save();
    // console.log("saved question => ", question);
    res.json(question);
  } catch (err) {
    console.log(err);
  }
};

exports.questions = async (req, res) => {
  try {
    const perPage = 2;
    const page = req.params.page ? req.params.page : 1;

    const all = await Question.find()
      .skip((page - 1) * perPage)
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 })
      .limit(perPage);
    res.json(all);
  } catch (err) {
    console.log(err);
  }
};

exports.viewCount = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.questionId,
      { $inc: { views: 1 } },
      { new: true }
    );
    // console.log("question VIEW", question);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

exports.questionDelete = async (req, res) => {
  try {
    const question = await Question.findById(req.params.questionId).select(
      "postedBy"
    );
    if (question.postedBy._id.toString() === req.user._id.toString()) {
      const deleted = await Question.findByIdAndRemove(req.params.questionId);
      res.json(deleted);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.questionsCount = async (req, res) => {
  try {
    const count = await Question.countDocuments();
    // console.log("count", count);
    res.json(count);
  } catch (err) {
    console.log(err);
  }
};

exports.AllQuestions = async (req, res) => {
  try {
    const all = await Question.find()
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 })
      .limit(500);
    res.json(all);
  } catch (err) {
    console.log(err);
  }
};

exports.editQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.questionId,
      { ...req.body },
      { new: true }
    );
    res.json(question);
  } catch (err) {
    console.log(err);
  }
};
