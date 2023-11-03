import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import { ConfirmDialog } from "../common";
import {
  Feedback,
  GetFeedbackListResponse,
  useCheckFeedbackMutation,
  useDeleteFeedbackMutation,
  useGetFeedbackListQuery,
  useRecoverFeedbackMutation,
} from "@/services/feedback";
import { FeedbackListItem } from "./feedback-list-item.component";

export const FeedbackList = () => {
  const [withDeleted, setWithDeleted] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const [expanded, setExpanded] = useState<number>(-1);

  const [deleteId, setDeleteId] = useState<number>(-1);
  const [permanentlyDelete, setPermanentlyDelete] = useState<boolean>(false);
  const [recoverId, setRecoverId] = useState<number>(-1);
  const [paginatedData, setPaginatedData] = useState<GetFeedbackListResponse[]>(
    []
  );

  const { data, isLoading } = useGetFeedbackListQuery({
    pagination: { page, amount: 20 },
    withDeleted,
  });

  const [checkFeedback] = useCheckFeedbackMutation();
  const [deleteFeedback] = useDeleteFeedbackMutation();
  const [recoverFeedback] = useRecoverFeedbackMutation();

  const handleCheckClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const id = event.currentTarget.getAttribute("data-id");
      if (id) checkFeedback(+id);
    },
    [checkFeedback]
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

  const handleExpand = useCallback(
    (event: React.SyntheticEvent, expanded: boolean) => {
      const id = event.currentTarget.getAttribute("data-id");
      if (id) setExpanded(expanded ? +id : -1);
    },
    []
  );

  const handleRecoverClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const id = event.currentTarget.getAttribute("data-id");
      if (id) setRecoverId(+id);
    },
    []
  );

  const handleCloseDeleteDialog = () => setDeleteId(-1);
  const handleDeleteAgree = () => {
    deleteFeedback({ id: deleteId, permanently: permanentlyDelete });
    handleCloseDeleteDialog();
  };

  const handleCloseRecoverDialog = () => setRecoverId(-1);
  const handleRecoverAgree = () => {
    recoverFeedback(recoverId);
    handleCloseRecoverDialog();
  };

  useEffect(() => {
    setPage(1);
    setPaginatedData([]);
  }, [withDeleted]);

  useEffect(() => {
    if (data)
      setPaginatedData((prev) =>
        [
          ...prev.filter(
            (el) => el.pagination.currentPage !== data.pagination.currentPage
          ),
          data,
        ].sort((a, b) =>
          a.pagination.currentPage > b.pagination.currentPage ? 1 : -1
        )
      );
  }, [data]);

  const { distributedByDateData } = useMemo(() => {
    const reducedData = paginatedData.reduce(
      (prev, cur) => prev.concat(cur.data),
      [] as Feedback[]
    );
    const distributedByDateData: {
      [key: string]: Feedback[];
    } = {};
    reducedData.forEach((el) => {
      if (el.createdAtDate in distributedByDateData)
        distributedByDateData[el.createdAtDate].push(el);
      else distributedByDateData[el.createdAtDate] = [el];
    });
    for (const key in distributedByDateData)
      distributedByDateData[key].sort((a, b) =>
        a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0
      );
    return { reducedData, distributedByDateData };
  }, [paginatedData]);

  return (
    <>
      {data && (
        <>
          <FormControlLabel
            control={
              <Checkbox
                value={withDeleted}
                onChange={(e) => setWithDeleted(e.target.checked ? 1 : 0)}
              />
            }
            label="With deleted"
            sx={{ ml: "auto", my: 1 }}
          />
          <Grid container spacing={2}>
            {Object.keys(distributedByDateData).map((key) => (
              <Grid item container key={key} xs={12} spacing={1}>
                <Grid item key="title" xs={12}>
                  <Typography variant="h6">{key}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                {distributedByDateData[key].map((feedback: Feedback) => (
                  <Grid item key={feedback.id} xs={12}>
                    <FeedbackListItem
                      expanded={expanded === feedback.id}
                      data={feedback}
                      onExpand={handleExpand}
                      onCheckClick={handleCheckClick}
                      onDeleteClick={handleDeleteClick}
                      onRecoverClick={handleRecoverClick}
                    />
                  </Grid>
                ))}
              </Grid>
            ))}
          </Grid>
          {data.pagination.currentPage < data.pagination.totalPages && (
            <Button
              onClick={() =>
                data.pagination.currentPage < data.pagination.totalPages &&
                setPage(data.pagination.currentPage + 1)
              }
              disabled={isLoading}
              variant="contained"
              sx={{ my: 2 }}
            >
              Load more
            </Button>
          )}
        </>
      )}
      <ConfirmDialog
        open={deleteId !== -1}
        title="Delete feedback"
        description={`This action will${
          permanentlyDelete ? " permanently" : ""
        } delete the feedback. Do you agree?`}
        onClose={handleCloseDeleteDialog}
        onDisagree={handleCloseDeleteDialog}
        onAgree={handleDeleteAgree}
      />
      <ConfirmDialog
        open={recoverId !== -1}
        title="Recover feedback"
        description="This action will recover the feedback. Do you agree?"
        onClose={handleCloseRecoverDialog}
        onDisagree={handleCloseRecoverDialog}
        onAgree={handleRecoverAgree}
      />
    </>
  );
};
