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
        let { token } = req.headers;

        if (token === undefined || token === null) {
          // to display all posts for the readers
          let blogPostsData = await Post.find({});
          let blogPosts = [];
          blogPostsData.forEach((el) => {
            blogPosts.push(el.content);
          });
          res.status(200).send({ post: blogPosts });
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
          //   search user blogs where author id inside post db matches user_id
          let blogPostsData = await Post.find({ author: user_id });
          // console.log(blogPostsData);
          // store blog content
          let blogPosts = [];

          blogPostsData.forEach((el) => {
            let postObj = {
              content: el.content,
              id: el._id,
            };
            blogPosts.push(postObj);
          });

          // send blogs array that contains post content and post id
          res.status(200).send({ post: blogPosts });
        }
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        // write post method here
      } catch (error) {
        res
          .status(400)
          .json({ success: false, message: "failed to send blog" });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
