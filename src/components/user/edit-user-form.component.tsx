import React, { useEffect, useState } from "react";
import { Role, User, UserStatus, useUpdateUserMutation } from "@/services/user";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { FormContainer } from "../common";

interface P {
  initialData: User;
  onAfterSubmit?: (result: User) => void;
  onCancel?: () => void;
}

export const EditUserForm = ({ initialData, onAfterSubmit, onCancel }: P) => {
  const [role, setRole] = useState<Role>(initialData.role);
  const [status, setStatus] = useState<UserStatus>(initialData.status);
  const [disabled, setDisabled] = useState<boolean>(true);

  const [updateUser, { error, isLoading, reset }] = useUpdateUserMutation();

  const handleSubmit = async () => {
    const res = await updateUser({
      id: initialData.id,
      body: { role, status },
    }).unwrap();
    onAfterSubmit?.(res);
  };

  useEffect(() => {
    setDisabled(!role || !status);
  }, [role, status]);

  return (
    <FormContainer
      hasError={disabled}
      loading={isLoading}
      error={error}
      title="Edit user"
      onSubmit={handleSubmit}
      onCancel={onCancel}
      reset={reset}
    >
      <Grid item xs={12}>
        <FormControl fullWidth margin="dense" variant="standard">
          <InputLabel id="edit-user-form-role">Role</InputLabel>
          <Select
            labelId="edit-user-form-role"
            label="Role"
            value={role}
            onChange={(event) => setRole(event.target.value as Role)}
          >
            <MenuItem key={Role.USER} value={Role.USER}>
              {Role.USER}
            </MenuItem>
            <MenuItem key={Role.ADMIN} value={Role.ADMIN}>
              {Role.ADMIN}
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth margin="dense" variant="standard">
          <InputLabel id="edit-user-form-status">Status</InputLabel>
          <Select
            labelId="edit-user-form-status"
            label="Status"
            value={status}
            onChange={(event) => setStatus(event.target.value as UserStatus)}
          >
            <MenuItem key={UserStatus.BLOCKED} value={UserStatus.BLOCKED}>
              {UserStatus.BLOCKED}
            </MenuItem>
            <MenuItem key={UserStatus.ACTIVE} value={UserStatus.ACTIVE}>
              {UserStatus.ACTIVE}
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </FormContainer>
  );
};
