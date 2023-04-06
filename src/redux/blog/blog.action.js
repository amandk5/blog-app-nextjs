import axios from "axios";
import { DELETE_BLOG, UPDATE_BLOG } from "./blog.types";

export const postBlog = async (htmlDoc) => {
  // get user token and send as header to api
  let token = localStorage.getItem("blog_app_user_token");

  //   console.log(token);
  let action = await axios
    .post(
      "/api/blog/create",
      { htmlDoc },
      {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    )
    .then((res) => {
      alert("blog posted successfully");
      return "success";
    })
    .catch((err) => {
      alert("failed to post blog");
      return "error";
    });

  return action;
};

// delete blog
export const deleteBlog = (blog_id) => async (dispatch) => {
  // get user token and send as header to api
  let token = localStorage.getItem("blog_app_user_token");
  // console.log(blog_id);

  await axios
    .delete(`/api/blog/delete/${blog_id}`, {
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    })
    .then((res) => {
      // console.log(res);
      alert("blog deleted successfully");
      dispatch({ type: DELETE_BLOG });
    })
    .catch((err) => {
      console.log(err);
      alert("failed to delete blog");
    });
};

// update blog
export const updateBlog = async (blog) => {
  // get user token and send as header to api
  let token = localStorage.getItem("blog_app_user_token");
  // console.log(blog, token);
  // dispatch({ type: UPDATE_BLOG, payload: blog_id });
  let action = await axios
    .patch(
      "/api/blog/update",
      {
        content: blog.content,
        id: blog.id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    )
    .then((res) => {
      // console.log(res);
      alert("blog updated successfully");
      return "success";
    })
    .catch((err) => {
      console.log(err);
      alert("failed to update blog");
      return "error";
    });
  return action;
};
