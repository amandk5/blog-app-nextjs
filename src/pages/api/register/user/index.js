import dbConnect from "../../../../db/dbConnect";
import User from "../../../../models/user";
import argon2 from "argon2";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect().then(() => console.log("connected"));

  switch (method) {
    case "GET":
      try {
        res.status(200).json({ msg: "register route" });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const { email, password, user_type } = req.body;
        // console.log(req.body);
        // res.status(201).send("success");

        //   using argon2 to create hash for password
        const hash = await argon2.hash(password);

        if (user_type === "reader") {
          const newUser = new User({
            email,
            password: hash,
            role: "reader",
          });
          // save to db
          await newUser.save();
          // ----------
        } else if (user_type === "author") {
          const newUser = new User({
            email,
            password: hash,
            role: "author",
          });
          // save to db
          await newUser.save();
          // ----------
        }
        // send success response
        res
          .status(201)
          .send({ success: true, message: "user registered successfully" });
        // -------------
      } catch (error) {
        res
          .status(400)
          .json({ success: false, message: "user registration failed" });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
