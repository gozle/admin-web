import React, { useCallback, useMemo, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  DialogContent,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  BlogPost,
  useDeleteBlogPostTranslationMutation,
  useRecoverBlogPostTranslationMutation,
} from "@/services/blog";
import {
  AddBlogPostTranslationForm,
  EditBlogPostTranslationForm,
} from "../blog-post-translation";
import { ConfirmDialog } from "../common";

interface P {
  data: BlogPost;
  onRecoverClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onEditClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onDeleteClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const BlogPostComponent = ({
  data,
  onRecoverClick,
  onEditClick,
  onDeleteClick,
}: P) => {
  const [addTranslationOpen, setAddTranslationOpen] = useState<boolean>(false);
  const [editTranslationId, setEditTranslationId] = useState<number>(-1);
  const [deleteTranslationId, setDeleteTranslationId] = useState<number>(-1);
  const [permanentlyDelete, setPermanentlyDelete] = useState<boolean>(false);
  const [recoverTranslationId, setRecoverTranslationId] = useState<number>(-1);

  const [deleteBlogPostTranslation] = useDeleteBlogPostTranslationMutation();
  const [recoverBlogPostTranslation] = useRecoverBlogPostTranslationMutation();

  const handleTranslationEditClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const id = event.currentTarget.getAttribute("data-id");
      if (id) setEditTranslationId(+id);
    },
    []
  );

  const handleTranslationDeleteClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const id = event.currentTarget.getAttribute("data-id");
      if (id) setDeleteTranslationId(+id);
      setPermanentlyDelete(
        event.currentTarget.hasAttribute("data-permanently")
      );
    },
    []
  );

  const handleTranslationRecoverClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const id = event.currentTarget.getAttribute("data-id");
      if (id) setRecoverTranslationId(+id);
    },
    []
  );

  const handleCloseDeleteTranslationDialog = () => setDeleteTranslationId(-1);
  const handleDeleteTranslationAgree = () => {
    deleteBlogPostTranslation({
      id: deleteTranslationId,
      blogPostId: data.id,
      permanently: permanentlyDelete,
    });
    handleCloseDeleteTranslationDialog();
  };

  const handleCloseRecoverTranslationDialog = () => setRecoverTranslationId(-1);
  const handleRecoverTranslationAgree = () => {
    recoverBlogPostTranslation({
      id: recoverTranslationId,
      blogPostId: data.id,
    });
    handleCloseRecoverTranslationDialog();
  };

  const handleAddClose = () => setAddTranslationOpen(false);

  const handleEditClose = () => setEditTranslationId(-1);

  const editTranslation = useMemo(
    () => data.translations?.find((st) => st.id === editTranslationId),
    [data, editTranslationId]
  );

  return (
    <>
      <Card>
        <CardHeader
          action={
            <ButtonGroup size="small" sx={{ marginLeft: "auto" }}>
              {data.deletedAt ? (
                <IconButton onClick={onRecoverClick} data-id={data.id}>
                  <RestoreFromTrashIcon />
                </IconButton>
              ) : (
                <>
                  <IconButton onClick={onEditClick} data-id={data.id}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={onDeleteClick} data-id={data.id}>
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
              <IconButton
                onClick={onDeleteClick}
                data-id={data.id}
                data-permanently
              >
                <RemoveCircleIcon />
              </IconButton>
            </ButtonGroup>
          }
        />
        <CardMedia
          sx={{ height: 140 }}
          image={data.image}
          title={
            data.translations && data.translations.length > 0
              ? data.translations[0].title
              : ""
          }
        />
        <CardContent>
          <List>
            {data.translations?.map((trans) => (
              <ListItem key={trans.id}>
                {trans.language ? (
                  <ListItemIcon>
                    <Typography variant="h6" component="div">
                      {trans.language.shortName}
                    </Typography>
                  </ListItemIcon>
                ) : (
                  <></>
                )}
                <ListItemText primary={trans.title} />
                {
                  <ButtonGroup size="small" sx={{ marginLeft: "auto" }}>
                    {trans.deletedAt ? (
                      <IconButton
                        onClick={handleTranslationRecoverClick}
                        data-id={trans.id}
                      >
                        <RestoreFromTrashIcon />
                      </IconButton>
                    ) : (
                      <>
                        <IconButton
                          onClick={handleTranslationEditClick}
                          data-id={trans.id}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={handleTranslationDeleteClick}
                          data-id={trans.id}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                    <IconButton
                      onClick={handleTranslationDeleteClick}
                      data-id={trans.id}
                      data-permanently
                    >
                      <RemoveCircleIcon />
                    </IconButton>
                  </ButtonGroup>
                }
              </ListItem>
            ))}
          </List>
        </CardContent>
        <CardActions>
          <Button
            variant="text"
            size="small"
            startIcon={<AddIcon />}
            sx={{ ml: "auto" }}
            onClick={() => setAddTranslationOpen(true)}
          >
            Add translation
          </Button>
        </CardActions>
      </Card>

      <Dialog
        fullWidth
        maxWidth="lg"
        open={addTranslationOpen}
        onClose={handleAddClose}
      >
        <DialogContent>
          <AddBlogPostTranslationForm
            onAfterSubmit={handleAddClose}
            onCancel={handleAddClose}
            blogPostId={data.id}
          />
        </DialogContent>
      </Dialog>

      {editTranslation && (
        <Dialog
          fullWidth
          maxWidth="lg"
          open={editTranslationId !== -1}
          onClose={handleEditClose}
        >
          <DialogContent>
            <EditBlogPostTranslationForm
              initialData={editTranslation}
              onAfterSubmit={handleEditClose}
              onCancel={handleEditClose}
            />
          </DialogContent>
        </Dialog>
      )}

      <ConfirmDialog
        open={deleteTranslationId !== -1}
        title="Delete blog post translation"
        description={`This action will${
          permanentlyDelete ? " permanently" : ""
        } delete the blog post translation. Do you agree?`}
        onClose={handleCloseDeleteTranslationDialog}
        onDisagree={handleCloseDeleteTranslationDialog}
        onAgree={handleDeleteTranslationAgree}
      />
      <ConfirmDialog
        open={recoverTranslationId !== -1}
        title="Recover blog post translation"
        description="This action will recover the blog post translation. Do you agree?"
        onClose={handleCloseRecoverTranslationDialog}
        onDisagree={handleCloseRecoverTranslationDialog}
        onAgree={handleRecoverTranslationAgree}
      />
    </>
  );
};
