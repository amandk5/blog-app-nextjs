import {
  BLOG_POSTED_SUCCESSFULLY,
  DELETE_BLOG,
  SINGLE_BLOG_TO_DISPLAY,
  SINGLE_MY_BLOG_TO_DISPLAY,
  UPDATE_BLOG,
  WRITE_BLOG_POST,
} from "./blog.types";

const initialState = {
  // contains a new blog post to be posted by user
  blog_post: "",
  // contain single blog post to display for readers
  single_blog_to_display: "",
  // contain single blog post to display for admin or postAuhor
  single_my_blog_to_display: {},
};

export default function blogReducer(state = initialState, action) {
  switch (action.type) {
    case WRITE_BLOG_POST:
      // any new blog which the user is writing gets store in blog_post
      return {
        ...state,
        blog_post: action.payload,
      };
    case BLOG_POSTED_SUCCESSFULLY:
      // this resets the blog_post to ""
      return {
        ...state,
        blog_post: "",
      };
    case SINGLE_BLOG_TO_DISPLAY:
      return {
        ...state,
        single_blog_to_display: action.payload,
      };
    case SINGLE_MY_BLOG_TO_DISPLAY:
      return {
        ...state,
        single_my_blog_to_display: action.payload,
      };
    case DELETE_BLOG:
      return {
        ...state,
        single_my_blog_to_display: {},
      };
    case UPDATE_BLOG:
      return {
        ...state,
        single_my_blog_to_display: {
          ...state.single_my_blog_to_display,
          content: action.payload,
        },
      };

    default:
      return state;
  }
}
