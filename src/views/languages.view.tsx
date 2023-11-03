import React, { useState } from "react";
import Head from "react-helmet";
import { WithMenuLayout } from "@/layouts";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Paper,
  styled,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AddLanguageForm, LanguageList } from "@/components/language";

const ExtraItemsBox = styled(Box)`
  margin-left: auto;
`;

const LanguagesView = () => {
  const [open, setOpen] = useState<boolean>(false);

  const extraItems = (
    <ExtraItemsBox>
      <Button
        size="medium"
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        Add language
      </Button>
    </ExtraItemsBox>
  );

  const handleClose = () => setOpen(false);

  return (
    <>
      <Head>
        <title>Languages</title>
      </Head>
      <WithMenuLayout title="Languages" extraItems={extraItems}>
        <Paper sx={{ width: "100%" }}>
          <LanguageList />
        </Paper>
      </WithMenuLayout>

      <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose}>
        <DialogContent>
          <AddLanguageForm onAfterSubmit={handleClose} onCancel={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LanguagesView;
