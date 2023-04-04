import dbConnect from "../../../../db/dbConnect";
import User from "../../../../models/user";
import argon2 from "argon2";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect().then(() => console.log("connected"));

  switch (method) {
    case "GET":
      try {
        res.status(200).json({ msg: "admin register route" });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const { email, password } = req.body;

        //   using argon2 to create hash for password
        const hash = await argon2.hash(password);

        const newAdmin = new User({
          email,
          password: hash,
          role: "admin",
        });
        // save to db
        await newAdmin.save();
        // ----------
        // send success response
        res
          .status(201)
          .send({ success: true, message: "admin registered successfully" });
        // -------------
      } catch (error) {
        res
          .status(400)
          .json({ success: false, message: "admin registration failed" });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
