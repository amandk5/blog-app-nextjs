import { EditorState, convertToRaw } from "draft-js";
import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import { convertToHTML } from "draft-convert";
import { Box } from "@chakra-ui/react";
import { WRITE_BLOG_POST } from "@/redux/blog/blog.types";
import draftToHtml from "draftjs-to-html";

const MyEditor = () => {
  // const { test } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  // const [convertedContent, setConvertedContent] = useState(null);
  const [convertedContent2, setConvertedContent2] = useState(null);

  const onEditorStateChange = (state) => {
    setEditorState(state);
  };

  // import draftToHtml from "draftjs-to-html";
  useEffect(() => {
    // let data = editorState.getCurrentContent();
    // let file = JSON.stringify(convertToRaw(data));
    // console.log(file);
    // console.log(editorState);

    // let html = convertToHTML(editorState.getCurrentContent());

    // setConvertedContent(html);

    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState);
    // markup is producing image also so use this one, dont use html variable one
    // console.log("newone", markup);
    setConvertedContent2(markup);
    // dispatch({ type: TEST, payload: editorState });
  }, [editorState]);

  useEffect(() => {
    dispatch({ type: WRITE_BLOG_POST, payload: convertedContent2 });
    console.log("2", convertedContent2);
  }, [convertedContent2]);

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

export default MyEditor;
