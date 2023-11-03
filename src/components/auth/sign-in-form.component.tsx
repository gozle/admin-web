import React from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSignInMutation } from "@/services/auth";
import { setTokens } from "@/lib/store/features/auth";
import { styled } from "@mui/material/styles";
import LoginIcon from "@mui/icons-material/Login";
import { httpErrorSerializer } from "@/lib/serializers";
import { HttpError } from "@/lib/type";

const Root = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 350px;
  margin: auto;
  flex-grow: 1;

  & > form {
    width: 100%;

    & > .btn_container {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-end;
      width: 100%;
      margin: 0.5em 0;
    }
  }
`;

export const SignInForm = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [signIn, { data, error, isLoading }] = useSignInMutation();

  const handleSignIn = (event: React.FormEvent) => {
    event.preventDefault();
    signIn({ username, password });
  };

  useEffect(() => {
    if (data) dispatch(setTokens(data));
  }, [data, dispatch]);

  return (
    <Root>
      <form onSubmit={handleSignIn}>
        <TextField
          type="text"
          label="Username"
          value={username}
          disabled={isLoading}
          size="small"
          margin="dense"
          required
          onChange={(event) => setUsername(event.target.value)}
          fullWidth
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          disabled={isLoading}
          size="small"
          margin="dense"
          required
          onChange={(event) => setPassword(event.target.value)}
          fullWidth
          error={password ? password.length < 6 || password.length > 32 : false}
        />
        {error ? (
          <Typography color={"error"}>
            {"data" in error
              ? httpErrorSerializer(error.data as HttpError)
              : JSON.stringify(error)}
          </Typography>
        ) : (
          <></>
        )}
        <div className="btn_container">
          <Button
            type="submit"
            disabled={isLoading}
            variant="contained"
            endIcon={<LoginIcon />}
          >
            Sign In
          </Button>
        </div>
      </form>
    </Root>
  );
};
