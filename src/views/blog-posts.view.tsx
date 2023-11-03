import React, { useState } from "react";
import Head from "react-helmet";
import { WithMenuLayout } from "@/layouts";
import { AddBlogPostForm, BlogPostList } from "@/components/blog-post";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Dialog, DialogContent, styled } from "@mui/material";

const ExtraItemsBox = styled(Box)`
  margin-left: auto;
`;

const BlogPostsView = () => {
  const [open, setOpen] = useState<boolean>(false);

  const extraItems = (
    <ExtraItemsBox>
      <Button
        size="medium"
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        Add blog post
      </Button>
    </ExtraItemsBox>
  );

  const handleClose = () => setOpen(false);

  return (
    <>
      <Head>
        <title>Blog Posts</title>
      </Head>
      <WithMenuLayout title="BlogPosts" extraItems={extraItems}>
        <BlogPostList />
      </WithMenuLayout>

      <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose}>
        <DialogContent>
          <AddBlogPostForm onAfterSubmit={handleClose} onCancel={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BlogPostsView;
