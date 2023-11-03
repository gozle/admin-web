import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useEffect, useState } from "react";
import Head from "react-helmet";
import { WithMenuLayout } from "@/layouts";
import { useNavigate, useParams } from "react-router-dom";
import { RoutesPaths } from "@/lib/routes";
import { useGetSiteCategoryQuery } from "@/services/site";
import { Box, Button, Dialog, DialogContent, styled } from "@mui/material";
import { AddSiteForm, SiteList } from "@/components/site/site";

const ExtraItemsBox = styled(Box)`
  margin-left: auto;
`;

const SiteCategoryByIdView = ({ id }: { id: number }) => {
  const [open, setOpen] = useState<boolean>(false);

  const { data, isError } = useGetSiteCategoryQuery(id);

  const navigate = useNavigate();

  const extraItems = (
    <ExtraItemsBox>
      <Button
        size="medium"
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        Add site
      </Button>
    </ExtraItemsBox>
  );

  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (isError) navigate(RoutesPaths.SITE_CATEGORIES);
  }, [isError, navigate]);

  return data ? (
    <>
      <Head>
        <title>{data.slug}</title>
      </Head>
      <WithMenuLayout extraItems={extraItems} title={data.slug}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            my: 1,
          }}
        >
          <Button
            variant="text"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(RoutesPaths.SITE_CATEGORIES)}
          >
            Back
          </Button>
        </Box>
        <SiteList categoryId={data.id} />
      </WithMenuLayout>

      <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose}>
        <DialogContent>
          <AddSiteForm onAfterSubmit={handleClose} onCancel={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  ) : (
    <></>
  );
};

const SiteCategoryView = () => {
  const params = useParams();
  if (!params.id || !/^[0-9]+$/.test(params.id)) return null;
  return <SiteCategoryByIdView id={+params.id} />;
};

export default SiteCategoryView;
