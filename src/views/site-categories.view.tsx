import React, { useState } from "react";
import Head from "react-helmet";
import { WithMenuLayout } from "@/layouts";
import { Box, Button, Dialog, DialogContent, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  AddSiteCategoryForm,
  SiteCategoryList,
} from "@/components/site/site-category";

const ExtraItemsBox = styled(Box)`
  margin-left: auto;
`;

const SiteCategoriesView = () => {
  const [openAddCategoryForm, setOpenAddCategoryForm] =
    useState<boolean>(false);

  const handleCloseAddCategory = () => setOpenAddCategoryForm(false);

  const extraItems = (
    <ExtraItemsBox>
      <Button
        size="medium"
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() => setOpenAddCategoryForm(true)}
      >
        Add category
      </Button>
    </ExtraItemsBox>
  );

  return (
    <>
      <Head>
        <title>Site categories</title>
      </Head>
      <WithMenuLayout title="Site categories" extraItems={extraItems}>
        <SiteCategoryList />
      </WithMenuLayout>

      <Dialog
        fullWidth
        maxWidth="xs"
        open={openAddCategoryForm}
        onClose={handleCloseAddCategory}
      >
        <DialogContent>
          <AddSiteCategoryForm
            onAfterSubmit={handleCloseAddCategory}
            onCancel={handleCloseAddCategory}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SiteCategoriesView;
