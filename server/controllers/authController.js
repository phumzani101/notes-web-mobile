import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import nanoid from "nanoid";

import sgMail from "@sendgrid/mail";
import config from "../config/index.js";
sgMail.setApiKey(config.sendgridApiKey);

export const signup = async (req, res) => {
  try {
    // validation
    const { name, email, password } = req.body;
    if (!name) {
      return res.json({
        error: "Name is required",
      });
    }
    if (!email) {
      return res.json({
        error: "Email is required",
      });
    }
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be 6 characters long",
      });
    }
    const exist = await UserModel.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is taken",
      });
    }
    // hash password

    try {
      const user = await new UserModel({
        name,
        email,
        password,
      }).save();

      // create signed token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      //   console.log(user);

      return res.json({
        token,
        user,
      });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

export const signin = async (req, res) => {
  // console.log(req.body);
  try {
    const { email, password } = req.body;
    // check if our db has user with that email
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      return res.json({
        error: "No user found",
      });
    }
    // check password
    const match = await user.authenticate(password);
    if (!match) {
      return res.json({
        error: "Wrong password",
      });
    }
    // create signed token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;
    user.secret = undefined;
    res.json({
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  // find user by email
  const user = await UserModel.findOne({ email });
  console.log("USER ===> ", user);
  if (!user) {
    return res.json({ error: "UserModel not found" });
  }
  // generate code
  const resetCode = nanoid(5).toUpperCase();
  // save to db
  user.resetCode = resetCode;
  user.save();
  // prepare email
  const emailData = {
    from: config.sendgridEmailFrom,
    to: user.email,
    subject: "Password reset code",
    html: `<h1>Your password  reset code is: ${resetCode}</h1>`,
  };
  // send email
  try {
    const data = await sgMail.send(emailData);
    console.log(data);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.json({ ok: false });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password, token } = req.body;
    // find user based on email and resetCode
    const user = await UserModel.findOne({ resetCode: token }).select(
      "+password"
    );
    // if user not found
    if (!user) {
      return res.json({ error: "Reset code is invalid" });
    }
    // if password is short
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be 6 characters long",
      });
    }
    // hash password
    user.password = password;
    user.resetCode = "";
    await user.save();
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

export default { signup, signin, forgotPassword, resetPassword };
