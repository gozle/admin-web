import { Feedback } from "@/services/feedback";
import {
  Typography,
  ButtonGroup,
  IconButton,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import React from "react";

interface P {
  data: Feedback;
  expanded: boolean;
  onExpand: (event: React.SyntheticEvent, expanded: boolean) => void;
  onCheckClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onDeleteClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onRecoverClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const FeedbackListItem = React.memo(
  ({
    data,
    expanded,
    onExpand,
    onCheckClick,
    onDeleteClick,
    onRecoverClick,
  }: P) => (
    <Accordion
      expanded={expanded}
      onChange={onExpand}
      sx={{
        border: "1px solid",
        borderColor: data.checked ? "success.main" : "error.main",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        data-id={data.id}
        sx={{ userSelect: "text" }}
      >
        <Typography
          sx={{
            px: 2,
            flexShrink: 0,
            flexGrow: 1,
            overflowWrap: "anywhere",
            display: "flex",
            alignItems: "center",
          }}
        >
          {data.name}
        </Typography>
        <Typography
          sx={{
            px: 2,
            flexShrink: 0,
            flexGrow: 1,
            color: "text.secondary",
            overflowWrap: "anywhere",
            display: "flex",
            alignItems: "center",
          }}
        >
          {data.email || ""}
        </Typography>
        <IconButton
          onClick={onDeleteClick}
          data-id={data.id}
          data-permanently
          sx={{ ml: "auto", mr: 1 }}
        >
          <RemoveCircleIcon />
        </IconButton>
      </AccordionSummary>
      <AccordionDetails>
        <Typography sx={{ overflowWrap: "anywhere", px: 2 }}>
          {data.text}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            mt: 2,
          }}
        >
          <ButtonGroup size="small">
            {data.deletedAt ? (
              <IconButton onClick={onRecoverClick} data-id={data.id}>
                <RestoreFromTrashIcon />
              </IconButton>
            ) : (
              <IconButton onClick={onDeleteClick} data-id={data.id}>
                <DeleteIcon />
              </IconButton>
            )}
            <IconButton onClick={onCheckClick} data-id={data.id}>
              {data.checked ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
            </IconButton>
            <IconButton
              onClick={onDeleteClick}
              data-id={data.id}
              data-permanently
            >
              <RemoveCircleIcon />
            </IconButton>
          </ButtonGroup>
          <Typography sx={{ textAlign: "end" }}>
            {new Date(data.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
);

FeedbackListItem.displayName = "FeedbackListItem";
