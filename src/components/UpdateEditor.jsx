import { ContentState, EditorState, convertToRaw } from "draft-js";
import { useEffect, useState } from "react";

import dynamic from "next/dynamic";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import { convertToHTML } from "draft-convert";
import { Box } from "@chakra-ui/react";
import { UPDATE_BLOG, WRITE_BLOG_POST } from "@/redux/blog/blog.types";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const UpdateEditor = () => {
  const { single_my_blog_to_display } = useSelector((store) => store.blog);

  const dispatch = useDispatch();

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);
  // console.log("s",single_my_blog_to_display);
  const onEditorStateChange = (state) => {
    setEditorState(state);
  };

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
  }, []);

  useEffect(() => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState);
    console.log(markup);
    setConvertedContent(markup);
  }, [editorState]);

  useEffect(() => {
    if (convertedContent !== null) {
      dispatch({ type: UPDATE_BLOG, payload: convertedContent });
    }
    // console.log("c",convertedContent);
  }, [convertedContent]);

  return (
    <Box
      className="editor"
      margin={"auto"}
      width={"95%"}
      height={"300px"}
      border={"1px solid black"}
    >
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
    </Box>
  );
};

export default UpdateEditor;
