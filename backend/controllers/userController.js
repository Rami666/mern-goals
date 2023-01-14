const registerUser = (req, res) => {
  res.json({ message: "User registered" });
};

const loginUser = (req, res) => {
    res.json({ message: "User logged in" });
    };

const getMe = (req, res) => {
    res.json({ message: "User data display" });
    };

module.exports = {
  registerUser,
    loginUser,
    getMe,
};
