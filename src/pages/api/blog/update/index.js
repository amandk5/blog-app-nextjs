import Post from "@/models/post";
import dbConnect from "../../../../db/dbConnect";
import User from "../../../../models/user";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect().then(() => console.log("connected"));

  switch (method) {
    case "GET":
      try {
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PATCH":
      try {
        let { token } = req.headers;
        let { content, id } = req.body;
        // console.log(content, id, token);

        if (token === undefined || token === null) {
          res.status(401).send({ error: true, message: "Not Allowed" });
        } else {
          // to display only logged in users, created post
          // verify token first
          let user_id = null;
          jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
              return res.status(403).json({ message: "Forbidden" });
            }
            //   get id from user and assign to user_id
            user_id = user.id;
          });

          //   // search user blogs where author id inside post db matches user_id
          //   // search this particular post in db
          let blogPost = await Post.findOne({ _id: id });
          //   //   now match the author id and user id in blogPost
          //   // convert author id to string for matching

          let author_Id = blogPost.author.toString();

          let userAndAuthorIdMatches = author_Id === user_id;
          // console.log(userAndAuthorIdMatches);
          if (userAndAuthorIdMatches === true) {
            // if match is true , then delete the blog post
            await Post.findOneAndUpdate(
              { _id: id },
              { content: content },
              { new: true }
            ).then((resp) => {
              res
                .status(200)
                .send({ success: true, message: "post updated successfully" });
            });
          } else {
            res.status(401).send({ success: false, message: "UnAuthorized" });
          }
        }
      } catch (error) {
        res
          .status(400)
          .json({ success: false, message: "failed to update blog" });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
