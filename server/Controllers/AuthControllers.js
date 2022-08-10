const UserModel = require("../Models/UserModel");
const adminModel = require("../Models/AdminModel");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "Razi super secret key", {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  let errors = { email: "", password: "" };
  if (err.message === "incorrect Email")
    errors.email = "That email is not registerd";
  if (err.message === "incorrect Password")
    errors.email = "That Password is Incorrect";
  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }
  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

module.exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.create({ name, email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      withCrdentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      withCrdentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });
    res.status(200).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

module.exports.adminlogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await adminModel.login(email, password);
    const token = createToken(admin._id);
    res.cookie("jwt", token, {
      withCrdentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });
    res.status(200).json({ admin: admin._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

module.exports.getuser = async (req, res, next) => {
  try {
    const user = await UserModel.find();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors });
  }
};

module.exports.blockUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const user = await UserModel.updateOne(
      { _id: id },
      { $set: { block: true } }
    );
    res.status(200).json();
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors });
  }
};
module.exports.unblockUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const user = await UserModel.updateOne(
      { _id: id },
      { $set: { block: false } }
    );
    res.status(200).json();
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors });
  }
};
module.exports.deleteUser = async (req, res, next) => {
  console.log("ksfjhsjh");
  try {
    const id = req.params.id;
    console.log(id);
    const user = await UserModel.deleteOne({ _id: id });
    res.status(200).json();
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors });
  }
};

module.exports.getuserdata = async (req, res, next) => {
  try {
    console.log("sfd");
    const id = req.params.id;
    const user = await UserModel.findOne({ _id: id });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors });
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    let result = await UserModel.findOneAndUpdate(
      { _id: id },
      { $set: req.body }
    );
    res.json(result);
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors });
  }
};
