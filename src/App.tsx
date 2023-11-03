import React, { Suspense } from "react";
import {
  Container,
  createTheme,
  CssBaseline,
  styled,
  ThemeProvider,
} from "@mui/material";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Head from "react-helmet";
import { store } from "@/lib/store";

const AuthRouter = React.lazy(
  () => import("@/components/router/auth-router.component")
);
const NotAuthRouter = React.lazy(
  () => import("@/components/router/not-auth-router.component")
);

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Root = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  min-height: 100vh;
  max-height: 100vh;

  & > .container {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: center;

    width: 100%;
  }
`;

const App = () => (
  <Root>
    <Head>
      <title>Gözle - Admin</title>
    </Head>
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container className="container">
            <Suspense>
              <NotAuthRouter />
              <AuthRouter />
            </Suspense>
          </Container>
        </ThemeProvider>
      </Router>
    </Provider>
  </Root>
);

export default App;
