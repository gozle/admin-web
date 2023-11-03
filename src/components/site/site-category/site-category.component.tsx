import React, { useCallback, useMemo, useState } from "react";
import {
  SiteCategory,
  useDeleteSiteCategoryTranslationMutation,
  useRecoverSiteCategoryTranslationMutation,
} from "@/services/site";
import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { ConfirmDialog } from "../../common";
import {
  AddSiteCategoryTranslationForm,
  EditSiteCategoryTranslationForm,
} from "../site-category-translation";
import AddIcon from "@mui/icons-material/Add";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

interface P {
  data: SiteCategory;
  onRecoverClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onEditClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onDeleteClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onOpenClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SiteCategoryComponent = ({
  data,
  onRecoverClick,
  onEditClick,
  onDeleteClick,
  onOpenClick,
}: P) => {
  const [addTranslationOpen, setAddTranslationOpen] = useState<boolean>(false);
  const [editTranslationId, setEditTranslationId] = useState<number>(-1);
  const [deleteTranslationId, setDeleteTranslationId] = useState<number>(-1);
  const [permanentlyDelete, setPermanentlyDelete] = useState<boolean>(false);
  const [recoverTranslationId, setRecoverTranslationId] = useState<number>(-1);

  const [deleteSiteCategoryTranslation] =
    useDeleteSiteCategoryTranslationMutation();
  const [recoverSiteCategoryTranslation] =
    useRecoverSiteCategoryTranslationMutation();

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
    deleteSiteCategoryTranslation({
      id: deleteTranslationId,
      siteCategoryId: data.id,
      permanently: permanentlyDelete,
    });
    handleCloseDeleteTranslationDialog();
  };

  const handleCloseRecoverTranslationDialog = () => setRecoverTranslationId(-1);
  const handleRecoverTranslationAgree = () => {
    recoverSiteCategoryTranslation({
      id: recoverTranslationId,
      siteCategoryId: data.id,
    });
    handleCloseRecoverTranslationDialog();
  };

  const handleCloseAddTranslation = () => setAddTranslationOpen(false);

  const handleCloseEditTranslation = () => setEditTranslationId(-1);

  const editTranslation = useMemo(
    () => data.translations?.find((st) => st.id === editTranslationId),
    [data, editTranslationId]
  );

  return (
    <>
      <Card>
        <CardHeader
          title={data.slug}
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
                  <IconButton onClick={onOpenClick} data-id={data.id}>
                    <OpenInNewIcon />
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
        <CardContent>
          <List>
            {data.translations?.map((trans) => (
              <ListItem key={trans.id}>
                {trans.language && (
                  <ListItemIcon>
                    <Typography variant="h6" component="div">
                      {trans.language.shortName}
                    </Typography>
                  </ListItemIcon>
                )}
                <ListItemText primary={trans.name} />
                <ButtonGroup size="small" sx={{ marginLeft: "auto" }}>
                  {trans.deletedAt ? (
                    <>
                      <IconButton
                        onClick={handleTranslationRecoverClick}
                        data-id={trans.id}
                      >
                        <RestoreFromTrashIcon />
                      </IconButton>
                    </>
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
        maxWidth="xs"
        open={addTranslationOpen}
        onClose={handleCloseAddTranslation}
      >
        <DialogContent>
          <AddSiteCategoryTranslationForm
            siteCategoryId={data.id}
            onAfterSubmit={handleCloseAddTranslation}
            onCancel={handleCloseAddTranslation}
          />
        </DialogContent>
      </Dialog>

      {editTranslation && (
        <Dialog
          fullWidth
          maxWidth="xs"
          open={editTranslationId !== -1}
          onClose={handleCloseEditTranslation}
        >
          <DialogContent>
            <EditSiteCategoryTranslationForm
              initialData={editTranslation}
              onAfterSubmit={handleCloseEditTranslation}
              onCancel={handleCloseEditTranslation}
            />
          </DialogContent>
        </Dialog>
      )}

      <ConfirmDialog
        open={deleteTranslationId !== -1}
        title="Delete site category translation"
        description={`This action will${
          permanentlyDelete ? " permanently" : ""
        } delete the site category translation. Do you agree?`}
        onClose={handleCloseDeleteTranslationDialog}
        onDisagree={handleCloseDeleteTranslationDialog}
        onAgree={handleDeleteTranslationAgree}
      />

      <ConfirmDialog
        open={recoverTranslationId !== -1}
        title="Recover site category translation"
        description="This action will recover the site category translation. Do you agree?"
        onClose={handleCloseRecoverTranslationDialog}
        onDisagree={handleCloseRecoverTranslationDialog}
        onAgree={handleRecoverTranslationAgree}
      />
    </>
  );
};
