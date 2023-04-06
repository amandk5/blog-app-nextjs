## Advanced Blog Application with Next.js, React, and User Authentication

This is a full-featured blog application built with Next.js and React that allows users to view a list of blog posts, read individual blog posts, create new blog posts, and interact with the content. It also introduces user roles such as admin, author, and reader.

<hr>

## Requirements

1. Create a new Next.js project using create-next-app and set up a basic file
   structure.
2. Introduce user roles (e.g., admin, author, and reader). Admins can edit or delete
   any blog post. Authors can edit or delete only their own blog posts. Readers can
   only view blog posts.
3. Implement the following pages and components:
   a. HomePage: Display a paginated list of blog posts with their titles and a
   short excerpt of their content. Each blog post should be clickable and
   navigate to its individual post page.
   b. PostPage: Display the full content of an individual blog post, including its
   title, content, and associated comments. Allow users to leave comments
   on the blog post.
   c. CreatePostPage: Display a form allowing users to create a new blog post.
   The form should include fields for the post's title, content, and an optional
   image upload. Use a rich text editor like Quill or Draft.js for the content
   field.
4. Use React hooks and functional components throughout the application.
5. Implement server-side rendering (SSR) for the HomePage and PostPage using
   Next.js's getServerSideProps function to fetch blog posts and individual post
   data, respectively.
6. Add search functionality to allow users to search for blog posts by title or
   content.
7. Add basic CSS styling to make the application visually appealing and
   user-friendly.
8. Implement client-side form validation for the CreatePostPage and comment
   forms.

<hr>

## Features

USER-AUTHENTICATION, CREATE-BLOG, EDIT/UPDATE- BLOG, DELETE BLOG,

## Tech-Stack

HTML, CSS, JS, NEXT-JS, REACT,MONGODB

## Tools And Libraries

CHAKRA-UI, REACT-ICONS, DRAFT.JS

<hr>

# How to run the application

## Online
---------

### Link: https://blog-app-adk.vercel.app/login

## Steps:

1. Register yourself from register page.
2. After registering, go the login page, and login with your credentials.
3. After successfull login, you get redirected to dashboard page, here you can find options like, view all blogs, show my blogs, create-blog etc.
4. You can create, edit and delete the blog post from My-blogs route.
5. User authentication with jsonwebtoken and password hashing is implemented with argon2.
6. You can logout from the application by clicking on "logout" button.

## Locally
----------

1. Clone the repository to your local machine.
2. Open the terminal in the root directory of the project.
3. Install the required dependencies using npm install.
4. Run the application locally using npm run dev.
5. Open your browser and go to http://localhost:3000.

<hr>

## Future improvements

1. Implement search functionality for blog posts
2. Implement admin functionality for managing blog posts
