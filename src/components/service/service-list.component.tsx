import React, { useCallback, useMemo, useState } from "react";
import { Dialog, DialogContent, Grid } from "@mui/material";
import {
  Service,
  useDeleteServiceMutation,
  useGetServiceListQuery,
  useRecoverServiceMutation,
} from "@/services/service";
import { EditServiceForm } from "./edit-service-form.component";
import { ConfirmDialog } from "../common";
import { ServiceComponent } from "./service.component";

export const ServiceList = () => {
  const [editServiceId, setEditServiceId] = useState<number>(-1);
  const [deleteServiceId, setDeleteServiceId] = useState<number>(-1);
  const [permanentlyDelete, setPermanentlyDelete] = useState<boolean>(false);
  const [recoverServiceId, setRecoverServiceId] = useState<number>(-1);

  const { data } = useGetServiceListQuery();
  const [deleteService] = useDeleteServiceMutation();
  const [recoverService] = useRecoverServiceMutation();

  const handleServiceRecoverClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const id = event.currentTarget.getAttribute("data-id");
      if (id) setRecoverServiceId(+id);
    },
    []
  );

  const handleServiceEditClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const id = event.currentTarget.getAttribute("data-id");
      if (id) setEditServiceId(+id);
    },
    []
  );

  const handleServiceDeleteClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const id = event.currentTarget.getAttribute("data-id");
      if (id) setDeleteServiceId(+id);
      setPermanentlyDelete(
        event.currentTarget.hasAttribute("data-permanently")
      );
    },
    []
  );

  const handleCloseDeleteServiceDialog = () => setDeleteServiceId(-1);
  const handleDeleteServiceAgree = () => {
    deleteService({ id: deleteServiceId, permanently: permanentlyDelete });
    handleCloseDeleteServiceDialog();
  };

  const handleCloseRecoverServiceDialog = () => setRecoverServiceId(-1);
  const handleRecoverServiceAgree = () => {
    recoverService(recoverServiceId);
    handleCloseRecoverServiceDialog();
  };

  const handleEditClose = () => setEditServiceId(-1);

  const editService = useMemo(
    () => data?.data.find((s) => s.id === editServiceId),
    [data, editServiceId]
  );

  return (
    <>
      {data && (
        <Grid container spacing={2}>
          {data.data.map((service: Service) => (
            <Grid item key={service.id} xs minWidth={350}>
              <ServiceComponent
                data={service}
                onRecoverClick={handleServiceRecoverClick}
                onEditClick={handleServiceEditClick}
                onDeleteClick={handleServiceDeleteClick}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {editService && (
        <Dialog
          fullWidth
          maxWidth="xs"
          open={editServiceId !== -1}
          onClose={handleEditClose}
        >
          <DialogContent>
            <EditServiceForm
              initialData={editService}
              onAfterSubmit={handleEditClose}
              onCancel={handleEditClose}
            />
          </DialogContent>
        </Dialog>
      )}

      <ConfirmDialog
        open={deleteServiceId !== -1}
        title="Delete service"
        description={`This action will${
          permanentlyDelete ? " permanently" : ""
        } delete the service. Do you agree?`}
        onClose={handleCloseDeleteServiceDialog}
        onDisagree={handleCloseDeleteServiceDialog}
        onAgree={handleDeleteServiceAgree}
      />
      <ConfirmDialog
        open={recoverServiceId !== -1}
        title="Recover service"
        description="This action will recover the service. Do you agree?"
        onClose={handleCloseRecoverServiceDialog}
        onDisagree={handleCloseRecoverServiceDialog}
        onAgree={handleRecoverServiceAgree}
      />
    </>
  );
};
