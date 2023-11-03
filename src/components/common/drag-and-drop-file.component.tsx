import { Theme, useTheme } from "@mui/material";
import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";

interface P {
  helpText: string;
  accept?: { [key: string]: string[] };
  maxFiles?: number;
  files: File[];
  disabled?: boolean;
  onDrop: (files: File[]) => void;
}

const baseStyle = (theme: Theme): React.CSSProperties => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: theme.palette.text.disabled,
  borderStyle: "dashed",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.disabled,
  outline: "none",
  transition: "border .24s ease-in-out",
});

const focusedStyle = (theme: Theme): React.CSSProperties => ({
  borderColor: theme.palette.primary.main,
});

const acceptStyle = (theme: Theme): React.CSSProperties => ({
  borderColor: theme.palette.success.main,
});

const rejectStyle = (theme: Theme): React.CSSProperties => ({
  borderColor: theme.palette.error.main,
});

const previewStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  flexWrap: "wrap",
  height: "150px",
  width: "100%",
};

export const DragAndDropFile = ({
  helpText,
  accept,
  maxFiles,
  files,
  disabled,
  onDrop,
}: P) => {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ accept, disabled, maxFiles, onDrop });
  const theme = useTheme();

  const style = useMemo(
    () => ({
      ...baseStyle(theme),
      ...(isFocused ? focusedStyle(theme) : {}),
      ...(isDragAccept ? acceptStyle(theme) : {}),
      ...(isDragReject ? rejectStyle(theme) : {}),
    }),
    [theme, isFocused, isDragAccept, isDragReject]
  );
  return (
    <div {...getRootProps({ style })}>
      <input {...getInputProps()} />
      {files.length ? (
        <div style={previewStyle}>
          {files.map((file, i) => {
            const preview = URL.createObjectURL(file);
            return file.type.indexOf("image") !== -1 ? (
              <img
                key={i}
                style={{
                  maxHeight: "calc(100% - 10px)",
                  margin: "5px",
                  maxWidth: "calc(100% - 10px)",
                }}
                src={preview}
                alt={file.name}
              />
            ) : file.type.indexOf("video") !== -1 ? (
              <video
                key={i}
                style={{
                  maxHeight: "calc(100% - 10px)",
                  margin: "5px",
                  maxWidth: "calc(100% - 10px)",
                }}
                controls
                src={preview}
              />
            ) : (
              <div>{file.name}</div>
            );
          })}
        </div>
      ) : (
        <p style={{ padding: "20px" }}>{helpText}</p>
      )}
    </div>
  );
};
