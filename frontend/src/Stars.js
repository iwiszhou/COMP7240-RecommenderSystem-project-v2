import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/learn-your-preference";
import Typography from "@mui/material/Typography";

export default function Stars({ rating }) {
  const [value, setValue] = React.useState(rating);

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      <Typography component="legend">Read only</Typography>
      <Rating name="read-only" value={value} readOnly />
      <Typography component="legend">Disabled</Typography>
      <Rating name="disabled" value={value} disabled />
      <Typography component="legend">No rating given</Typography>
      <Rating name="no-value" value={null} />
    </Box>
  );
}
