import React from "react";
import Head from "react-helmet";
import { WithMenuLayout } from "@/layouts";
import { FeedbackList } from "@/components/feedback";

const FeedbacksView = () => (
  <>
    <Head>
      <title>Feedbacks</title>
    </Head>
    <WithMenuLayout title="Feedbacks">
      <FeedbackList />
    </WithMenuLayout>
  </>
);

export default FeedbacksView;
