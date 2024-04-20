import { Button, Stack } from "@mui/material";
import React from "react";

export default function NextButton({ text, onClick = () => {} }) {
  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        marginTop: "50px",
      }}
    >
      <Button
        color="success"
        variant="contained"
        onClick={onClick}
        sx={{
          padding: "10px 80px",
        }}
      >
        {text}
      </Button>
    </Stack>
  );
}
