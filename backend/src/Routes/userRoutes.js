require("dotenv").config();
const express = require("express");
const { userModel } = require("./../db/UserSchema.js");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { userSchema } = require("../schema/userData.js");

// temporary storage
// const user = {}; // user with the key value pairs
// const validateTokens = new Map(); // tokens when created after the user signed ine

router.post("/signup", async (req, res) => {
  console.log(req.body);
  const result = userSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: result.error.format(),
    });
  }

  const { email, password, userName } = result.data;

  // if (!email || !password) {
  //   // if any of the fields are not given properly

  //   return res.status(400).json({
  //     success: false,
  //     message: "required fields are neccessary",
  //   });
  // }

  try {
    // check for the user that has already created with this email
    const user = await userModel.findOne({ email: email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User is already created with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 8); // the password must be hashed
    // to push the data we have to use the create method
    await userModel.create({
      userName: userName,
      email: email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "user created successfully",
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err,
    });
  }
});

router.post("/signin", async (req, res) => {
  const result = userSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: result.error.format(),
    });
  }

  const { email, password } = result.data;

  // if (!email || !password) {
  //   return res.status(400).json({
  //     success: false,
  //     message: "required fields are neccessary",
  //   });
  // }

  try {
    const user = await userModel.findOne({ email: email });
    console.log(await user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found with this credentials",
      });
    }

    bcrypt.compare(password, user.password).then(async (result) => {
      if (result) {
        // true
        // if true then return token
        const token = await jwt.sign(
          { email: email },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "2h",
          }
        );
        return res.status(200).json({
          success: true,
          message: "signed in",
          token: token,
          userName: user.userName,
        });
      }

      // false
      return res.status(400).json({
        success: false,
        message: "failed to signin",
      });
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err,
    });
  }
});

module.exports = router;
