import React, { useCallback, useMemo, useState } from "react";
import { Dialog, DialogContent, Grid } from "@mui/material";
import {
  Site,
  useDeleteSiteMutation,
  useGetSiteListQuery,
  useRecoverSiteMutation,
} from "@/services/site";
import { EditSiteForm } from "./edit-site-form.component";
import { ConfirmDialog } from "../../common";
import { SiteComponent } from "./site.component";

interface P {
  categoryId?: number;
}

export const SiteList = ({ categoryId }: P) => {
  const [editSiteId, setEditSiteId] = useState<number>(-1);
  const [deleteSiteId, setDeleteSiteId] = useState<number>(-1);
  const [permanentlyDelete, setPermanentlyDelete] = useState<boolean>(false);
  const [recoverSiteId, setRecoverSiteId] = useState<number>(-1);

  const { data } = useGetSiteListQuery({ categoryId });
  const [deleteSite] = useDeleteSiteMutation();
  const [recoverSite] = useRecoverSiteMutation();

  const handleSiteRecoverClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const id = event.currentTarget.getAttribute("data-id");
      if (id) setRecoverSiteId(+id);
    },
    []
  );

  const handleSiteEditClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const id = event.currentTarget.getAttribute("data-id");
      if (id) setEditSiteId(+id);
    },
    []
  );

  const handleSiteDeleteClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const id = event.currentTarget.getAttribute("data-id");
      if (id) setDeleteSiteId(+id);
      setPermanentlyDelete(
        event.currentTarget.hasAttribute("data-permanently")
      );
    },
    []
  );

  const handleCloseDeleteSiteDialog = () => setDeleteSiteId(-1);
  const handleDeleteSiteAgree = () => {
    deleteSite({ id: deleteSiteId, permanently: permanentlyDelete });
    handleCloseDeleteSiteDialog();
  };

  const handleCloseRecoverSiteDialog = () => setRecoverSiteId(-1);
  const handleRecoverSiteAgree = () => {
    recoverSite(recoverSiteId);
    handleCloseRecoverSiteDialog();
  };

  const handleCloseEditSite = () => setEditSiteId(-1);

  const editSite = useMemo(
    () => data?.data.find((s) => s.id === editSiteId),
    [data, editSiteId]
  );

  return (
    <>
      {data && (
        <Grid container spacing={2}>
          {data.data.map((site: Site) => (
            <Grid item key={site.id} xs>
              <SiteComponent
                data={site}
                onRecoverClick={handleSiteRecoverClick}
                onEditClick={handleSiteEditClick}
                onDeleteClick={handleSiteDeleteClick}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {editSite && (
        <Dialog
          fullWidth
          maxWidth="xs"
          open={editSiteId !== -1}
          onClose={handleCloseEditSite}
        >
          <DialogContent>
            <EditSiteForm
              initialData={editSite}
              onAfterSubmit={handleCloseEditSite}
              onCancel={handleCloseEditSite}
            />
          </DialogContent>
        </Dialog>
      )}

      <ConfirmDialog
        open={deleteSiteId !== -1}
        title="Delete site"
        description={`This action will${
          permanentlyDelete ? " permanently" : ""
        } delete the site. Do you agree?`}
        onClose={handleCloseDeleteSiteDialog}
        onDisagree={handleCloseDeleteSiteDialog}
        onAgree={handleDeleteSiteAgree}
      />
      <ConfirmDialog
        open={recoverSiteId !== -1}
        title="Recover site"
        description="This action will recover the site. Do you agree?"
        onClose={handleCloseRecoverSiteDialog}
        onDisagree={handleCloseRecoverSiteDialog}
        onAgree={handleRecoverSiteAgree}
      />
    </>
  );
};
