import DashboardHeader from "@/components/DashboardHeader";
import { deleteBlog } from "@/redux/blog/blog.action";
import { ArrowBackIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import DOMPurify from "dompurify";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function DisplayMyBlog() {
  const { single_my_blog_to_display } = useSelector((store) => store.blog);
  // for modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [postIndex, setPostIndex] = useState(
  //   router.pathname[router.pathname.length - 1]
  // );

  // for dispatching action
  const dispatch = useDispatch();

  const router = useRouter();
  // console.log(router.query.displaymyblog);

  useEffect(() => {
    if (Object.keys(single_my_blog_to_display).length === 0) {
      router.replace("/dashboard/my-blogs");
    }
  }, [single_my_blog_to_display]);

  return (
    <Box margin={"auto"} w="95%">
      <DashboardHeader page="MyBlogs" />

      <Link href="/dashboard/my-blogs">
        <ArrowBackIcon fontSize="x-large" />
      </Link>

      <Box my="5" p="5" border="1px solid gainsboro" borderRadius="0.5rem">
        <Box
          dangerouslySetInnerHTML={createMarkup(
            single_my_blog_to_display.content
          )}
        ></Box>
        <Box
          mt="2"
          justifyContent="right"
          display="flex"
          flexWrap="wrap"
          columnGap="5"
          rowGap="3"
        >
          <Link href={`/dashboard/my-blogs/edit/${router.query.displaymyblog}`}>
            <Button
              fontSize="large"
              bg="white"
              color="#e76f51"
              opacity="0.9"
              _hover={{ opacity: "1" }}
            >
              <EditIcon />
            </Button>
          </Link>
          <Button
            fontSize="large"
            bg="white"
            color="#e63946"
            opacity="0.9"
            _hover={{ opacity: "1" }}
            onClick={() => {
              onOpen();
            }}
          >
            <DeleteIcon />
          </Button>
        </Box>
      </Box>

      {/* modal  */}
      <>
        {/* <Button onClick={onOpen}>Open Modal</Button> */}

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Are You Sure Want To Delete?</ModalHeader>
            <ModalCloseButton />

            <ModalFooter>
              <Button
                colorScheme="teal"
                mr={3}
                onClick={() => {
                  // when user clicks, dispatch deleteBlog to perform deletion from db
                  dispatch(deleteBlog(single_my_blog_to_display.id));
                  setTimeout(() => {
                    onClose();
                  }, 500);
                }}
              >
                Yes
              </Button>
              <Button bg="#e63946" color="white" mr={3} onClick={onClose}>
                No
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
      {/* end of modal  */}
    </Box>
  );
}

// for creating markup of html file
function createMarkup(html) {
  return {
    __html: DOMPurify.sanitize(html),
  };
}
