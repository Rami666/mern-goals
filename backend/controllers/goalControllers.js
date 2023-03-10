const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json(goals);
});

const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    return res.status(400);
    throw new Error("please add a text");
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
});

const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(404);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id);
// check for user
  if(!user) {
    res.status(404);
    throw new Error("User not found");
  }
// make sure to logged in user is the owner of the goal
  if(goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(404);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id);
  // check for user
    if(!user) {
      res.status(404);
      throw new Error("User not found");
    }
  // make sure to logged in user is the owner of the goal
    if(goal.user.toString() !== user.id) {
      res.status(401);
      throw new Error("Not authorized");
    }
await goal.remove();

  res.status(200).json({ id: req.params.id});
});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};
