import DashboardHeader from "@/components/DashboardHeader";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { ContentState, EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { updateBlog } from "@/redux/blog/blog.action";

const MyUpdateEditor = dynamic(() => import("@/components/UpdateEditor"), {
  ssr: false,
});

export default function Edit() {
  const { single_my_blog_to_display } = useSelector((store) => store.blog);

  const dispatch = useDispatch();
  const router = useRouter();

  const [editorState, setEditorState] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load html-to-draftjs library on the client-side
      const htmlToDraft = require("html-to-draftjs").default;

      const blocksFromHtml = htmlToDraft(single_my_blog_to_display.content);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      const state = EditorState.createWithContent(contentState);
      setEditorState(state);
    }
  }, [single_my_blog_to_display.content]);

  useEffect(() => {
    // console.log(editorState);
    // const rawContentState = convertToRaw(editorState);
    // const markup = draftToHtml(rawContentState);
  }, [editorState]);

  return (
    <Box margin={"auto"} w="95%">
      <DashboardHeader page="MyBlogs" />

      <Flex margin={"auto"} w="95%" flexWrap="wrap">
        <Link href={`/dashboard/my-blogs/${router.query.editIndex}`}>
          <ArrowBackIcon fontSize="x-large" />
        </Link>
        <Heading display="inline" fontSize="x-large" ml="3">
          Edit Blog
        </Heading>
      </Flex>
      <br />

      {editorState && <MyUpdateEditor editorStatee={editorState} />}
      <Box margin={"auto"} width={"95%"}>
        {/* update post button  */}
        <Box textAlign="right" mt="2">
          <Button
            bg="teal"
            color="white"
            onClick={async () => {
              // dispatch updateBlog function and send blog_post to updateBlog function
              let response = await updateBlog(single_my_blog_to_display);
              // console.log(single_my_blog_to_display);
              // if response is success then redirect to my blogs page else do nothing
              if (response === "success") {
                router.replace("/dashboard/my-blogs");
              }
            }}
          >
            SAVE CHANGES
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
