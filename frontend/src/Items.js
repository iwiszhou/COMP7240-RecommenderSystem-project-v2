import React, { useEffect, useState } from "react";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import { Box, Rating, Typography } from "@mui/material";
import NextButton from "./SubmitButton";
import { useLocation, useNavigate } from "react-router-dom";

const itemData = [
  {
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1190970/header_alt_assets_0.jpg?t=1709724676",
    name: "House Flipper 2",
    author: "@bkristastucchio",
    all_reviews_score: 2,
  },
  {
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1364780/header_alt_assets_9.jpg?t=1709012771",
    name: "Street Fighter™ 6",
    author: "@bkristastucchio",
    all_reviews_score: 4,
  },
  {
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/394360/header_alt_assets_3.jpg?t=1709243951",
    name: "Hearts of Iron IV",
    author: "@bkristastucchio",
    all_reviews_score: 1,
  },
];

export default function Items() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(itemData.map((i) => ({ ...i })));
  }, []);

  const handleRateItemOnClick = (itemIndex) => (event, newValue) => {
    const cp = [...items];
    cp[itemIndex] = { ...cp[itemIndex] };
    cp[itemIndex].all_reviews_score = newValue;
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
            List of games we guess you would like
          </Typography>
        </ImageListItem>
        {items.map((item, index) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.name}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              subtitle={item.author}
              sx={{
                //   backgroundColor: "rgba(156,153,153,0.5)",
                background: "rgb(2,0,36)",
                background:
                  "linear-gradient(90deg, rgba(2,0,36,0.5) 10%, rgba(255,255,255,1) 70%, rgba(239,239,239,1) 100%)",
              }}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.title}`}
                >
                  <Rating
                    sx={
                      {
                        // backgroundColor: "white",
                      }
                    }
                    name="simple-controlled"
                    value={items[index].all_reviews_score}
                    onChange={handleRateItemOnClick(index)}
                  />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>

      <NextButton
        text={"Try again"}
        onClick={() => {
          navigate("/");
        }}
      />
    </Box>
  );
}
