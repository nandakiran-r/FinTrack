const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const login = async (request, response) => {
  const email = request.body.email;
  const password = request.body.password;

  let user, hash, loginStatus, token;

  try {
    user = await userModel.findOne({
      email: email,
    });

    if (user) {
      hash = user.password;
      if (hash) {
        loginStatus = await bcrypt.compare(password, hash);
        if (loginStatus === true) {
          token = jwt.sign(
            {
              id: user.id,
              role: user.role,
            },
            process.env.JWT_TOKEN,
            { expiresIn: "1d" }
          );
          return response.json({
            status: "success",
            token: token,
            username: user.username,
            role: user.role,
          });
        } else {
          return response.json({
            status: "failed",
            message: "Incorrect Password",
          });
        }
      }
    } else {
      return response.json({
        status: "failed",
        message: "Login Failed!",
      });
    }
  } catch (error) {
    return response.json({
      status: "failed",
      message: "Something went wrong! Try again",
    });
  }
};

const createUser = async (request, response) => {
  const username = request.body.username;
  const email = request.body.email;
  const password = request.body.password;

  let existingUsername, existingEmail, hashpass, adduser;

  try {
    existingUsername = await userModel.findOne({ username });
    existingEmail = await userModel.findOne({ email });

    if (!username || !password || !email) {
      return response.json({
        status: "failed",
        message: "All fields required!",
      });
    } else if (existingUsername) {
      return response.json({ status: "failed", message: "Username taken" });
    } else if (existingEmail) {
      return response.json({
        status: "failed",
        message: "Email already registered",
      });
    } else if (/\s/.test(username)) {
      return response.json({
        status: "failed",
        message: "No whitespaces allowed in username",
      });
    } else {
      hashpass = await bcrypt.hash(password, 10);
      adduser = await userModel.create({
        username: username,
        email: email,
        password: hashpass,
        role: "user",
      });
      return response.json({
        status: "success",
        message: "User created Successfully",
      });
    }
  } catch (error) {
    return response.json({
      status: "failed",
      message: "Something went wrong! Try again",
    });
  }
};


module.exports = {
  login,
  createUser
};
