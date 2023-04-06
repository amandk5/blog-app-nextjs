import Post from "@/models/post";
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
        res.status(200).json({ msg: "blog create route" });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const { token } = req.headers;
        const { htmlDoc } = req.body;

        // console.log(token);
        // token is required, if no token found , return err
        if (token === undefined) {
          res.status(401).send("token is required to access this api");
        }
        // use decode token or jwt verify
        // const decoded = jwt.decode(token);
        // console.log(decoded);

        let user_id = null;
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
          if (err) {
            return res.status(403).json({ message: "Forbidden" });
          }
          //   get id from user and assign to user_id
          user_id = user.id;
        });

        // first check in db,wheather the user exist
        let user = await User.findOne({ _id: user_id });

        if (user === null || user === undefined) {
          res.status(401).send({ message: "Invalid User" });
        } else {
          const newPost = new Post({
            content: htmlDoc,
            author: user_id,
          });

          await newPost
            .save()
            .then((resp) => res.status(201).send("saved to db"))
            .catch((err) => res.status(400).send("saving to db failed"));
        }
      } catch (error) {
        res
          .status(400)
          .json({ success: false, message: "failed to post blog" });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
