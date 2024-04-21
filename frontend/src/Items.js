import React, { useEffect, useState } from "react";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import { Box, Rating, Typography } from "@mui/material";
import NextButton from "./SubmitButton";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchRecommendGames } from "./APIs";

const methodExplanation = {
  content_based: "Please give me a Explanation",
  svd: "Please give me a Explanation",
};

export default function Items() {
  const navigate = useNavigate();
  const location = useLocation();
  const [items, setItems] = useState([]);

  let userProfiles = location?.state?.["user-profiles"] || "";
  console.log(userProfiles);

  useEffect(() => {
    fetchRecommendGames(userProfiles).then((data) => {
      console.log(data);
      setItems(data);
    });
  }, []);

  const handleRateItemOnClick = (itemIndex) => (event, newValue) => {
    const cp = [...items];
    cp[itemIndex] = { ...cp[itemIndex] };
    cp[itemIndex].all_reviews_score = newValue;
    setItems(cp);
  };
  return (
    <Box>
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
        Games Recommendation
      </Typography>
      {Object.keys(items).map((m) => {
        return (
          <>
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
              {methodExplanation[m]}
            </Typography>
            <ImageList cols={5} gap={2}>
              {items[m].map((item, index) => (
                <ImageListItem key={item.game_id}>
                  <img
                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.img}?w=248&fit=crop&auto=format`}
                    alt={item.name}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={item.name}
                    subtitle={item.developer}
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
          </>
        );
      })}

      <NextButton
        text={"Try again"}
        onClick={() => {
          navigate("/");
        }}
      />
    </Box>
  );
}
