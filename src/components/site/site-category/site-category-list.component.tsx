import React, { useCallback, useMemo, useState } from "react";
import { Dialog, DialogContent, Grid } from "@mui/material";
import {
  SiteCategory,
  useDeleteSiteCategoryMutation,
  useGetSiteCategoryListQuery,
  useRecoverSiteCategoryMutation,
} from "@/services/site";
import { EditSiteCategoryForm } from "./edit-site-category-form.component";
import { ConfirmDialog } from "../../common";
import { SiteCategoryComponent } from "./site-category.component";
import { useNavigate } from "react-router-dom";
import { RoutesPaths } from "@/lib/routes";

export const SiteCategoryList = () => {
  const [editId, setEditId] = useState<number>(-1);
  const [deleteId, setDeleteId] = useState<number>(-1);
  const [permanentlyDelete, setPermanentlyDelete] = useState<boolean>(false);
  const [recoverId, setRecoverId] = useState<number>(-1);

  const navigate = useNavigate();

  const { data } = useGetSiteCategoryListQuery();

  const [deleteSiteCategory] = useDeleteSiteCategoryMutation();
  const [recoverSiteCategory] = useRecoverSiteCategoryMutation();

  const handleRecoverClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const id = event.currentTarget.getAttribute("data-id");
      if (id) setRecoverId(+id);
    },
    []
  );

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
      setPermanentlyDelete(
        event.currentTarget.hasAttribute("data-permanently")
      );
    },
    []
  );

  const handleOpenClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const id = event.currentTarget.getAttribute("data-id");
      if (id) navigate(RoutesPaths.SITE_CATEGORY.replace(":id", id));
    },
    [navigate]
  );

  const handleCloseDeleteDialog = () => setDeleteId(-1);
  const handleDeleteAgree = () => {
    deleteSiteCategory({
      id: deleteId,
      permanently: permanentlyDelete,
    });
    handleCloseDeleteDialog();
  };

  const handleCloseRecoverDialog = () => setRecoverId(-1);
  const handleRecoverAgree = () => {
    recoverSiteCategory(recoverId);
    handleCloseRecoverDialog();
  };

  const handleCloseEditSiteCategory = () => setEditId(-1);

  const editSiteCategory = useMemo(
    () => data?.data.find((s) => s.id === editId),
    [data, editId]
  );

  return (
    <>
      {data && (
        <Grid container spacing={2}>
          {data.data.map((site: SiteCategory) => (
            <Grid item key={site.id} xs>
              <SiteCategoryComponent
                data={site}
                onRecoverClick={handleRecoverClick}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteClick}
                onOpenClick={handleOpenClick}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {editSiteCategory && (
        <Dialog
          fullWidth
          maxWidth="xs"
          open={editId !== -1}
          onClose={handleCloseEditSiteCategory}
        >
          <DialogContent>
            <EditSiteCategoryForm
              initialData={editSiteCategory}
              onAfterSubmit={handleCloseEditSiteCategory}
              onCancel={handleCloseEditSiteCategory}
            />
          </DialogContent>
        </Dialog>
      )}

      <ConfirmDialog
        open={deleteId !== -1}
        title="Delete site category"
        description={`This action will${
          permanentlyDelete ? " permanently" : ""
        } delete the site category. Do you agree?`}
        onClose={handleCloseDeleteDialog}
        onDisagree={handleCloseDeleteDialog}
        onAgree={handleDeleteAgree}
      />
      <ConfirmDialog
        open={recoverId !== -1}
        title="Recover site category"
        description="This action will recover the site category. Do you agree?"
        onClose={handleCloseRecoverDialog}
        onDisagree={handleCloseRecoverDialog}
        onAgree={handleRecoverAgree}
      />
    </>
  );
};
