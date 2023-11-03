import React, { useState } from "react";
import Head from "react-helmet";
import { WithMenuLayout } from "@/layouts";
import { Box, Button, Dialog, DialogContent, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AddServiceForm, ServiceList } from "@/components/service";

const ExtraItemsBox = styled(Box)`
  margin-left: auto;
`;

const ServicesView = () => {
  const [open, setOpen] = useState<boolean>(false);

  const extraItems = (
    <ExtraItemsBox>
      <Button
        size="medium"
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        Add service
      </Button>
    </ExtraItemsBox>
  );

  const handleClose = () => setOpen(false);

  return (
    <>
      <Head>
        <title>Services</title>
      </Head>
      <WithMenuLayout title="Services" extraItems={extraItems}>
        <ServiceList />
      </WithMenuLayout>

      <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose}>
        <DialogContent>
          <AddServiceForm onAfterSubmit={handleClose} onCancel={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ServicesView;
