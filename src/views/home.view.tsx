import React from "react";
import { WithMenuLayout } from "@/layouts";
import Head from "react-helmet";

const HomeView = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <WithMenuLayout title="Home">
        <></>
      </WithMenuLayout>
    </>
  );
};

export default HomeView;
