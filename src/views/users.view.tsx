import React, { useState } from "react";
import Head from "react-helmet";
import { WithMenuLayout } from "@/layouts";
import { AddUserForm, UserList } from "@/components/user";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Paper,
  styled,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const ExtraItemsBox = styled(Box)`
  margin-left: auto;
`;

const UsersView = () => {
  const [open, setOpen] = useState<boolean>(false);

  const extraItems = (
    <ExtraItemsBox>
      <Button
        size="medium"
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        Add user
      </Button>
    </ExtraItemsBox>
  );

  const handleClose = () => setOpen(false);

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <WithMenuLayout title="Users" extraItems={extraItems}>
        <Paper sx={{ width: "100%" }}>
          <UserList />
        </Paper>
      </WithMenuLayout>

      <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose}>
        <DialogContent>
          <AddUserForm onAfterSubmit={handleClose} onCancel={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UsersView;
