import User from "../models/User.js";
// to-do to install bcrypt

import bcrypt from "bcryptjs";
import ENV from "../lib/ENV.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { phone, password, firstname, lastname } = req.body;
  console.log(phone, password, firstname, lastname);

  if (password.length < 6)
    return res.status(400).json({ warning: "password is to weak" });
  if (firstname.length < 3 || lastname.length < 3)
    return res.status(400).json({ warning: "personal data is to short" });

  if (!phone.startsWith("+992") || phone.length < 13 || !phone)
    return res.status(400).json({ warning: "Invalid phone number" });
  try {
    const userExists = await User.findOne({ phone });
    if (userExists)
      return res.status(400).json({ warning: "Invalid credentials" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ phone, password: hashedPassword, firstname, lastname });
    res.status(200).json({ succes: "User created seccesfully" });
  } catch (error) {
    console.error("Error ocured while signig up ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { phone, password } = req.body;
  console.log(phone, password)

  if (!phone.startsWith("+992") || phone.length < 13 || !phone)
    return res.status(400).json({ warning: "Invalid phone number" });
  if (password.length < 6)
    return res.status(400).json({ warning: "password is to weak" });
  const user = await User.findOne({ phone });
  if (!user) return res.status(404).json({ warning: "User is not found" });

  try {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ warning: "User password is not equal" });

    const token = jwt.sign(
      { id: user._id, phone: user.phone, name: user.firstname },
      ENV.JWT_SECRET,
      { expiresIn: "5d" },
      
    );

res.cookie('marketToken', token, {
  httpOnly: true,
  secure: false, 
  sameSite: 'none', 
  maxAge: 365 * 24 * 60 * 60 * 1000 
});


    res.status(200).json({ success: "User logged successfully" });
  } catch (error) {
    console.error("Error ocured while  loging ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
 