import React, { useCallback, useMemo, useState } from "react";
import {
  Service,
  useDeleteServiceTranslationMutation,
  useRecoverServiceTranslationMutation,
} from "@/services/service";
import {
  Avatar,
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
import { ConfirmDialog } from "../common";
import {
  AddServiceTranslationForm,
  EditServiceTranslationForm,
} from "../service-translation";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

interface P {
  data: Service;
  onRecoverClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onEditClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onDeleteClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ServiceComponent = ({
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

  const [deleteServiceTranslation] = useDeleteServiceTranslationMutation();
  const [recoverServiceTranslation] = useRecoverServiceTranslationMutation();

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
    deleteServiceTranslation({
      id: deleteTranslationId,
      serviceId: data.id,
      permanently: permanentlyDelete,
    });
    handleCloseDeleteTranslationDialog();
  };

  const handleCloseRecoverTranslationDialog = () => setRecoverTranslationId(-1);
  const handleRecoverTranslationAgree = () => {
    recoverServiceTranslation({ id: recoverTranslationId, serviceId: data.id });
    handleCloseRecoverTranslationDialog();
  };

  const handleAddTranslationClose = () => setAddTranslationOpen(false);

  const handleEditTranslationClose = () => setEditTranslationId(-1);

  const editTranslation = useMemo(
    () => data.translations?.find((st) => st.id === editTranslationId),
    [data, editTranslationId]
  );

  return (
    <>
      <Card>
        <CardHeader
          title={
            <Typography
              sx={{ mr: 1, overflowWrap: "anywhere" }}
              variant="body2"
            >
              {data.siteUrl}
            </Typography>
          }
          avatar={
            <Avatar
              alt={data.siteUrl}
              src={data.logo}
              imgProps={{ sx: { objectPosition: "left" } }}
              sx={{ backgroundColor: data.color, p: 1 }}
            />
          }
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
        <CardContent>
          <List>
            {data.translations?.map((trans) => (
              <ListItem key={trans.id}>
                {trans.language && (
                  <ListItemIcon>
                    <Avatar>
                      <Typography color="white">
                        {trans.language.shortName}
                      </Typography>
                    </Avatar>
                  </ListItemIcon>
                )}
                <ListItemText
                  primary={trans.title}
                  secondary={trans.description}
                />
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
        maxWidth="xs"
        open={addTranslationOpen}
        onClose={handleAddTranslationClose}
      >
        <DialogContent>
          <AddServiceTranslationForm
            serviceId={data.id}
            onAfterSubmit={handleAddTranslationClose}
            onCancel={handleAddTranslationClose}
          />
        </DialogContent>
      </Dialog>

      {editTranslation && (
        <Dialog
          fullWidth
          maxWidth="xs"
          open={editTranslationId !== -1}
          onClose={handleEditTranslationClose}
        >
          <DialogContent>
            <EditServiceTranslationForm
              initialData={editTranslation}
              onAfterSubmit={handleEditTranslationClose}
              onCancel={handleEditTranslationClose}
            />
          </DialogContent>
        </Dialog>
      )}

      <ConfirmDialog
        open={deleteTranslationId !== -1}
        title="Delete service translation"
        description={`This action will${
          permanentlyDelete ? " permanently" : ""
        } delete the service translation. Do you agree?`}
        onClose={handleCloseDeleteTranslationDialog}
        onDisagree={handleCloseDeleteTranslationDialog}
        onAgree={handleDeleteTranslationAgree}
      />
      <ConfirmDialog
        open={recoverTranslationId !== -1}
        title="Recover service translation"
        description="This action will recover the service translation. Do you agree?"
        onClose={handleCloseRecoverTranslationDialog}
        onDisagree={handleCloseRecoverTranslationDialog}
        onAgree={handleRecoverTranslationAgree}
      />
    </>
  );
};
