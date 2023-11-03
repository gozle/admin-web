import React, { useEffect, useState } from "react";
import { Role, useCreateUserMutation, User } from "@/services/user";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FormContainer } from "../common";

interface P {
  onAfterSubmit?: (result: User) => void;
  onCancel?: () => void;
}

export const AddUserForm = ({ onAfterSubmit, onCancel }: P) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>();
  const [role, setRole] = useState<Role>(Role.USER);
  const [disabled, setDisabled] = useState<boolean>(true);

  const [createUser, { error, isLoading, reset }] = useCreateUserMutation();

  const handleSubmit = async () => {
    const res = await createUser({ username, password, role }).unwrap();
    onAfterSubmit?.(res);
  };

  useEffect(() => {
    setDisabled(!username || !password || repeatPassword !== password || !role);
  }, [username, password, repeatPassword, role]);

  return (
    <FormContainer
      hasError={disabled}
      loading={isLoading}
      error={error}
      title="Add user"
      onSubmit={handleSubmit}
      onCancel={onCancel}
      reset={reset}
    >
      <Grid item xs={12}>
        <TextField
          type="text"
          label="Username"
          value={username}
          disabled={isLoading}
          size="small"
          margin="dense"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          onChange={(event) => setUsername(event.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          type="password"
          label="Password"
          value={password}
          disabled={isLoading}
          size="small"
          margin="dense"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          onChange={(event) => setPassword(event.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          type="password"
          label="Repeat password"
          value={repeatPassword}
          disabled={isLoading}
          size="small"
          margin="dense"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          onChange={(event) => setRepeatPassword(event.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth margin="dense" variant="standard">
          <InputLabel id="add-user-form-role">Role</InputLabel>
          <Select
            labelId="add-user-form-role"
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
    </FormContainer>
  );
};
