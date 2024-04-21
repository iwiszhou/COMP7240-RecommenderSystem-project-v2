import React, { useEffect, useState } from "react";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import { Box, Typography } from "@mui/material";
import NextButton from "./SubmitButton";
import { useLocation, useNavigate } from "react-router-dom";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { fetchGameByTags } from "./APIs";

export default function LearnYourPreference() {
  const navigate = useNavigate();
  const location = useLocation();
  const [items, setItems] = useState([]);

  let tags = location.state.tags;
  console.log(tags);

  useEffect(() => {
    fetchGameByTags(tags).then((data) => {
      console.log(data);
      setItems(data);
    });
    // setItems(itemData.map((i) => ({ ...i })));
  }, []);

  const handleRateItemOnClick = (itemIndex) => (event, newValue) => {
    const cp = [...items];
    cp[itemIndex] = { ...cp[itemIndex] };
    cp[itemIndex].isLike = !cp[itemIndex].isLike;
    setItems(cp);
  };
  return (
    <Box>
      <ImageList sx={{}}>
        <ImageListItem key="Subheader" cols={2}>
          {/* <ListSubheader component="div">
          
        </ListSubheader> */}
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              //   backgroundColor: "#fee7da",
              padding: "30px 100px 50px 100px",
              fontWeight: "400",
              textAlign: "center",
              //   borderRadius: "5px",
              color: "white",
            }}
          >
            Which one you more preference ?
          </Typography>
        </ImageListItem>
        {items.map((item, index) => (
          <ImageListItem key={item.id}>
            <img
              srcSet={item.img}
              src={item.img}
              alt={item.name}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.name}
              subtitle={item.developer}
              sx={{
                background: "rgb(2,0,36)",
                background:
                  "linear-gradient(90deg, rgba(2,0,36,0.5) 10%, rgba(255,255,255,1) 70%, rgba(239,239,239,1) 100%)",
              }}
              actionIcon={
                <IconButton
                  sx={{
                    color: "rgba(255, 255, 255, 0.54)",
                    "&:hover": {
                      transform: "scale(1.5)",
                    },
                  }}
                  aria-label={`info about ${item.name}`}
                >
                  <ThumbUpIcon
                    onClick={handleRateItemOnClick(index)}
                    style={{
                      fill: item.isLike ? "#faaf00" : "rgb(122,121,121)",
                    }} //#2e7d32 green
                  />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>

      <NextButton
        text={"Done"}
        onClick={() => {
          navigate("/items");
        }}
      />
    </Box>
  );
}
