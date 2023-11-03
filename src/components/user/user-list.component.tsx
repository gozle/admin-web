import React, { useCallback, useMemo, useState } from "react";
import { useGetUserListQuery, UserStatus } from "@/services/user";
import {
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";
import { EditUserForm } from "./edit-user-form.component";

export const UserList = () => {
  const { data } = useGetUserListQuery();
  const [editId, setEditId] = useState<number>(-1);

  const handleEditClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const id = event.currentTarget.getAttribute("data-id");
      if (id) setEditId(+id);
    },
    []
  );

  const editUser = useMemo(
    () => data?.data.find((u) => u.id === editId),
    [data, editId]
  );

  const handleEditClose = () => setEditId(-1);

  return (
    <>
      {data && (
        <List sx={{ width: "100%" }}>
          {data.data.map((user, i) => (
            <React.Fragment key={user.id}>
              {i > 0 && <Divider variant="middle" />}
              <ListItem
                secondaryAction={
                  <IconButton
                    size="small"
                    onClick={handleEditClick}
                    data-id={user.id}
                  >
                    <EditIcon />
                  </IconButton>
                }
              >
                <ListItemIcon>
                  {user.status === UserStatus.ACTIVE ? (
                    <CheckCircleIcon />
                  ) : (
                    <BlockIcon />
                  )}
                </ListItemIcon>
                <ListItemText>{user.username}</ListItemText>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      )}
      {editUser && (
        <Dialog
          fullWidth
          maxWidth="xs"
          open={editId !== -1}
          onClose={handleEditClose}
        >
          <DialogContent>
            <EditUserForm
              initialData={editUser}
              onAfterSubmit={handleEditClose}
              onCancel={handleEditClose}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
