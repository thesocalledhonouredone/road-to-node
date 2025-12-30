import User from "../models/userSchema.js";

async function getAllUsers(req, res) {
    const data = await User.find({});
    return res.json(data);
}

async function getUserById(req, res) {
    const id = req.params.id;
    const user = await User.findById(id);

    if (user) {
        return res.json(user);
    }
    return res.json({ message: "user not found" });
}

async function postUser(req, res) {
    const { firstName, lastName, email, jobTitle } = req.body;

    if (!firstName || !lastName || !email || !jobTitle) {
      return res.json({ message: "Invalid Input" });
    }
    const result = await User.create({ firstName, lastName, email, jobTitle });
    return res.json({ firstName: firstName, email: email });
}

async function putUser(req, res) {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const { firstName, lastName, email, jobTitle } = req.body;
    if (firstName !== undefined) {
      user.firstName = firstName;
    }
    if (lastName !== undefined) {
      user.lastName = lastName;
    }
    if (email !== undefined) {
      user.email = email;
    }
    if (jobTitle !== undefined) {
      user.jobTitle = jobTitle;
    }

    await user.save();
    return res.json(user);
}

async function deleteUser(req, res) {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
        return res.status(404).json({"message": "User Not Found"});
    }
    return res.json(user);
}

export {
    getAllUsers,
    getUserById,
    postUser,
    putUser,
    deleteUser,
};
