import dbConnect from "../../../db/dbConnect";
import User from "../../../models/user";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect().then(() => console.log("connected"));

  switch (method) {
    case "GET":
      try {
        res.status(200).json({ msg: "login route" });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const { email, password } = req.body;

        // find user through email
        const user = await User.findOne({ email });

        if (user === undefined) {
          // if user not found
          res.status(404).send({ success: false, message: "user not found" });
        } else {
          // if user found then verify password
          if (await argon2.verify(user.password, password)) {
            // if password verified, generate the token

            // 3 parts of token - header , payload, signature/secret
            // header generated automatically

            const token = jwt.sign(
              { id: user._id, email: user.email, role: user.role },
              "SECRET1234"
            );

            // to verify the token for authorization
            // jwt.verify(token,"SECRET1234")
            return res.status(200).send({ message: "Login Success", token });
          } else {
            return res.status(401).send({ message: "Login Failed" });
          }
        }
      } catch (error) {
        res.status(400).json({ success: false, message: "failed to login" });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
