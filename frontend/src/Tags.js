import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NextButton from "./SubmitButton";

//Feel free to add more tags here. UI will auto render
const tagData = [
  "FPS",
  "Gore",
  "Action",
  "Demons",
  "Shooter",
  "First-Person",
  "Great Soundtrack",
  "Multiplayer",
  "Singleplayer",
  "Fast-Paced",
];

const config = {
  rowPerItem: 3, // display n item per row
};

function Tags() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const handleTagOnClick = (val) => () => {
    const cp = [...selected];
    if (selected.includes(val)) {
      const index = selected.indexOf(val);
      if (index !== -1) {
        cp.splice(index, 1);
      }
    } else {
      cp.push(val);
    }
    setSelected(cp);
  };
  return (
    <div>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          background:
            "linear-gradient(345deg, rgba(226, 244, 255, 0.9) 5%, rgba(84, 107, 115, 0.3) 90%)",
          color: "white",
          fontSize: "26px",
          lineHeight: "32px",
          textOverflow: "ellipsis",
          padding: "50px 20px",
          borderRadius: "5px",
          marginTop: "20px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Please select your favorite gaming tags
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${config.rowPerItem}, 1fr)`,
        }}
      >
        {tagData.map((data) => (
          <Button
            color="info"
            variant={selected.includes(data) ? "contained" : "outlined"}
            key={data}
            sx={{
              margin: "7px",
              fontSize: "1rem",
            }}
            onClick={handleTagOnClick(data)}
          >
            {data}
          </Button>
        ))}
        <br />
      </Box>

      <NextButton
        text={"Next"}
        onClick={() => {
          navigate("/learn-your-preference");
        }}
      />
    </div>
  );
}

export default Tags;
