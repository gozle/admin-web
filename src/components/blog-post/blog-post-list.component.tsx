import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Dialog, DialogContent, Grid } from "@mui/material";
import { EditBlogPostForm } from "./edit-blog-post-form.component";
import { ConfirmDialog } from "../common";
import {
  BlogPost,
  GetBlogPostListResponse,
  useDeleteBlogPostMutation,
  useGetBlogPostListQuery,
  useRecoverBlogPostMutation,
} from "@/services/blog";
import { BlogPostComponent } from "./blog-post.component";

export const BlogPostList = () => {
  const [page, setPage] = useState<number>(1);
  const [editBlogPostId, setEditBlogPostId] = useState<number>(-1);
  const [deleteBlogPostId, setDeleteBlogPostId] = useState<number>(-1);
  const [permanentlyDelete, setPermanentlyDelete] = useState<boolean>(false);
  const [recoverBlogPostId, setRecoverBlogPostId] = useState<number>(-1);
  const [paginatedData, setPaginatedData] = useState<GetBlogPostListResponse[]>(
    []
  );

  const { data, isLoading } = useGetBlogPostListQuery({
    pagination: { page, amount: 20 },
  });
  const [deleteBlogPost] = useDeleteBlogPostMutation();
  const [recoverBlogPost] = useRecoverBlogPostMutation();

  const handleBlogPostRecoverClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const id = event.currentTarget.getAttribute("data-id");
      if (id) setRecoverBlogPostId(+id);
    },
    []
  );

  const handleBlogPostEditClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const id = event.currentTarget.getAttribute("data-id");
      if (id) setEditBlogPostId(+id);
    },
    []
  );

  const handleBlogPostDeleteClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const id = event.currentTarget.getAttribute("data-id");
      if (id) setDeleteBlogPostId(+id);
      setPermanentlyDelete(
        event.currentTarget.hasAttribute("data-permanently")
      );
    },
    []
  );

  const handleCloseDeleteBlogPostDialog = () => setDeleteBlogPostId(-1);
  const handleDeleteBlogPostAgree = () => {
    deleteBlogPost({ id: deleteBlogPostId, permanently: permanentlyDelete });
    handleCloseDeleteBlogPostDialog();
  };

  const handleCloseRecoverBlogPostDialog = () => setRecoverBlogPostId(-1);
  const handleRecoverBlogPostAgree = () => {
    recoverBlogPost(recoverBlogPostId);
    handleCloseRecoverBlogPostDialog();
  };

  useEffect(() => {
    if (data)
      setPaginatedData((prev) =>
        [
          ...prev.filter(
            (el) => el.pagination.currentPage !== data.pagination.currentPage
          ),
          data,
        ].sort((a, b) =>
          a.pagination.currentPage > b.pagination.currentPage ? 1 : -1
        )
      );
  }, [data]);

  const handleEditClose = () => setEditBlogPostId(-1);

  const { reducedData } = useMemo(() => {
    const reducedData = paginatedData.reduce(
      (prev, cur) => prev.concat(cur.data),
      [] as BlogPost[]
    );
    return { reducedData };
  }, [paginatedData]);

  const editBlogPost = useMemo(
    () => data?.data.find((s) => s.id === editBlogPostId),
    [data, editBlogPostId]
  );

  return (
    <>
      {data && (
        <>
          <Grid container spacing={2}>
            {reducedData.map((service: BlogPost) => (
              <Grid item key={service.id} xs={4}>
                <BlogPostComponent
                  data={service}
                  onRecoverClick={handleBlogPostRecoverClick}
                  onEditClick={handleBlogPostEditClick}
                  onDeleteClick={handleBlogPostDeleteClick}
                />
              </Grid>
            ))}
          </Grid>
          {data.pagination.currentPage < data.pagination.totalPages ? (
            <Button
              onClick={() =>
                data.pagination.currentPage < data.pagination.totalPages &&
                setPage(data.pagination.currentPage + 1)
              }
              disabled={isLoading}
              variant="contained"
              sx={{ mt: 2 }}
            >
              Load more
            </Button>
          ) : (
            <></>
          )}
        </>
      )}

      {editBlogPost && (
        <Dialog
          fullWidth
          maxWidth="xs"
          open={editBlogPostId !== -1}
          onClose={handleEditClose}
        >
          <DialogContent>
            <EditBlogPostForm
              initialData={editBlogPost}
              onAfterSubmit={handleEditClose}
              onCancel={handleEditClose}
            />
          </DialogContent>
        </Dialog>
      )}

      <ConfirmDialog
        open={deleteBlogPostId !== -1}
        title="Delete blog post"
        description={`This action will${
          permanentlyDelete ? " permanently" : ""
        } delete the blog post. Do you agree?`}
        onClose={handleCloseDeleteBlogPostDialog}
        onDisagree={handleCloseDeleteBlogPostDialog}
        onAgree={handleDeleteBlogPostAgree}
      />
      <ConfirmDialog
        open={recoverBlogPostId !== -1}
        title="Recover blog post"
        description="This action will recover the blog post. Do you agree?"
        onClose={handleCloseRecoverBlogPostDialog}
        onDisagree={handleCloseRecoverBlogPostDialog}
        onAgree={handleRecoverBlogPostAgree}
      />
    </>
  );
};
