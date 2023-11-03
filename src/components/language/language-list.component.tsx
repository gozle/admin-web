import React, { useCallback, useMemo, useState } from "react";
import {
  ButtonGroup,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useDeleteLanguageMutation,
  useGetLanguageListQuery,
} from "@/services/language";
import { EditLanguageForm } from "./edit-language-form.component";
import { ConfirmDialog } from "../common";

export const LanguageList = () => {
  const { data } = useGetLanguageListQuery();
  const [deleteLanguage] = useDeleteLanguageMutation();

  const [editId, setEditId] = useState<number>(-1);
  const [deleteId, setDeleteId] = useState<number>(-1);

  const handleEditClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const id = event.currentTarget.getAttribute("data-id");
      if (id) setEditId(+id);
    },
    []
  );

  const handleDeleteClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const id = event.currentTarget.getAttribute("data-id");
      if (id) setDeleteId(+id);
    },
    []
  );

  const handleCloseDeleteDialog = () => setDeleteId(-1);

  const handleDeleteAgree = () => {
    deleteLanguage(deleteId);
    handleCloseDeleteDialog();
  };

  const handleEditClose = () => setEditId(-1);

  const editLanguage = useMemo(
    () => data?.data.find((s) => s.id === editId),
    [data, editId]
  );

  return (
    <>
      {data && (
        <List sx={{ width: "100%" }}>
          {data.data.map((language, i) => (
            <>
              {i > 0 && <Divider variant="middle" />}
              <ListItem key={language.id}>
                <ListItemText
                  primary={language.name}
                  secondary={language.shortName}
                />
                <ButtonGroup size="small" sx={{ marginLeft: "auto" }}>
                  <IconButton onClick={handleEditClick} data-id={language.id}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={handleDeleteClick} data-id={language.id}>
                    <DeleteIcon />
                  </IconButton>
                </ButtonGroup>
              </ListItem>
            </>
          ))}
        </List>
      )}

      {editLanguage && (
        <Dialog
          fullWidth
          maxWidth="xs"
          open={editId !== -1}
          onClose={handleEditClose}
        >
          <DialogContent>
            <EditLanguageForm
              initialData={editLanguage}
              onAfterSubmit={handleEditClose}
              onCancel={handleEditClose}
            />
          </DialogContent>
        </Dialog>
      )}

      <ConfirmDialog
        open={deleteId !== -1}
        title="Delete language"
        description="This action will permanently delete the language. Do you agree?"
        onClose={handleCloseDeleteDialog}
        onDisagree={handleCloseDeleteDialog}
        onAgree={handleDeleteAgree}
      />
    </>
  );
};
