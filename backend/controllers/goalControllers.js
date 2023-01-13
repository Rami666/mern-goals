const getGoals = async (req, res) => {
  res.status(200).json({ message: "Get goals" });
};

const setGoals = async (req, res) => {

    if(!req.body.text){
    return res.status(400)
    throw new Error("please add a text")
    }
  res.status(200).json({ message: "Set goals" });
};

const updateGoals = async (req, res) => {
  res.status(200).json({ message: `Update goal ${req.params.id}` });
};

const deleteGoals = async (req, res) => {
    res.status(200).json({ message: `Delete goal ${req.params.id}` });
};

module.exports = {
  getGoals,
    setGoals,
    updateGoals,
    deleteGoals
};
