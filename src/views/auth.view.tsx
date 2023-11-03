import React from "react";
import { SignInForm } from "@/components/auth";
import Head from "react-helmet";

const AuthView = () => (
  <>
    <Head>
      <title>Sign In</title>
    </Head>
    <SignInForm />
  </>
);

export default AuthView;
