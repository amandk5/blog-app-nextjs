import Post from "@/models/post";
import dbConnect from "../../../db/dbConnect";
import User from "../../../models/user";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import NextCors from "nextjs-cors";

export default async function handler(req, res) {
  const { method } = req;

  // Run the cors middleware
  // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  await dbConnect().then(() => console.log("connected"));

  switch (method) {
    case "GET":
      try {
        let { token } = req.headers;

        // get current page and pageLimit
        const { current_page, limit } = req.query;
        // converting to Number type - current_page and limit
        let currentPage = Number(current_page) - 1;
        const pageLimit = Number(limit);
        // console.log(currentPage, pageLimit);

        if (token === undefined || token === null) {
          // to display all posts for the readers
          let blogPostsData = await Post.find({});
          let blogPosts = [];
          blogPostsData.forEach((el) => {
            blogPosts.push(el.content);
          });

          // calculate total page based on pageLimit per page
          const totalPages = Math.ceil(blogPosts.length / pageLimit);

          // Extracting the posts for the current page using slice
          if (currentPage == 0) {
            blogPosts = blogPosts.slice(currentPage, limit);
            // console.log(blogPosts);
          } else {
            blogPosts = blogPosts.slice(
              currentPage + (limit - 1),
              limit * (currentPage + 1)
            );
            // console.log(blogPosts);
          }

          res.status(200).send({
            post: blogPosts,
            totalPages: totalPages,
          });
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

          // calculate total page based on pageLimit per page
          const totalPages = Math.ceil(blogPosts.length / pageLimit);

          // Extracting the posts for the current page using slice
          if (currentPage == 0) {
            blogPosts = blogPosts.slice(currentPage, limit);
          } else {
            blogPosts = blogPosts.slice(
              currentPage + limit,
              limit * (currentPage + 1)
            );
          }

          // send blogs array that contains post content and post id
          res.status(200).send({
            post: blogPosts,
            totalPages: totalPages,
          });
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
