import React, { useEffect, useState } from "react";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import { Box, Rating, Typography } from "@mui/material";
import NextButton from "./SubmitButton";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchRecommendGames } from "./APIs";
import { getDefaultUserProfile } from "./data";

const generateNewUserId = () => {
  return 100000 + parseInt(Math.random() * 10);
};

const SessionUserId = generateNewUserId();

const methodExplanation = {
  content_based: {
    text: "These games have similar tags as what you selected",
    color: "#FC6238",
  },
  svd: {
    text: "These games are recommended to you based on players who have the same preferences as you",
    color: "#FFD872",
  },
};

export default function Items() {
  const navigate = useNavigate();
  const location = useLocation();
  const [items, setItems] = useState([]);
  const [userProfiles, setUserProfiles] = useState([]);

  let userLikes = location?.state?.["user-likes"] || "";
  console.log(userLikes);

  useEffect(() => {
    let userProfiles;
    if (!userLikes || userLikes?.length === 0) {
      //Default user profile
      userProfiles = getDefaultUserProfile(SessionUserId);
    } else {
      userProfiles = userLikes.map((l) => ({
        user_id: SessionUserId,
        game_name: l.name,
        game_id: l.game_id,
        rating: 3,
      }));
    }
    fetchRecommendGames(userProfiles).then((data) => {
      console.log(data);
      setItems(data);
      setUserProfiles(userProfiles);
    });
  }, []);

  const handleRateItemOnClick =
    (methodName, itemIndex) => (event, newValue) => {
      const cp = { ...items };
      cp[methodName][itemIndex] = { ...cp[methodName][itemIndex] };
      cp[methodName][itemIndex].all_reviews_score = newValue;
      console.log(cp[methodName][itemIndex]);
      setItems(cp);

      //Update user profile
      const cpUserProfiles = [...userProfiles];
      cpUserProfiles.push({
        user_id: SessionUserId,
        game_name: cp[methodName][itemIndex].name,
        game_id: cp[methodName][itemIndex].game_id,
        rating: newValue,
      });
      console.log(cpUserProfiles);
      setUserProfiles(cpUserProfiles);

      //Fetch new Recommendation
      fetchRecommendGames(cpUserProfiles).then((data) => {
        console.log(data);
        setItems(data);
      });
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
              variant="h6"
              gutterBottom
              sx={{
                //   backgroundColor: "#fee7da",
                // padding: "30px 100px 50px 0px",
                paddingLeft: "5px",
                fontWeight: "400",
                textAlign: "left",
                //   borderRadius: "5px",
                color: "white",
                borderLeft: `7px solid ${methodExplanation[m].color}`,
              }}
            >
              {methodExplanation[m].text}
            </Typography>
            <ImageList cols={5} gap={2}>
              {items[m].map((i, index) => (
                <ImageListItem key={i.game_id}>
                  <a href={i.url} target="_blank" alt="" rel="noreferrer">
                    <img
                      srcSet={`${i.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      src={`${i.img}?w=248&fit=crop&auto=format`}
                      alt={i.name}
                      loading="lazy"
                      width={"100%"}
                    />
                  </a>
                  <ImageListItemBar
                    title={i.name}
                    subtitle={i.developer}
                    sx={{
                      //   backgroundColor: "rgba(156,153,153,0.5)",
                      background: "rgb(2,0,36)",
                      background:
                        "linear-gradient(90deg, rgba(2,0,36,0.5) 10%, rgba(255,255,255,1) 70%, rgba(239,239,239,1) 100%)",
                    }}
                    actionIcon={
                      <IconButton
                        sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                        aria-label={`info about ${i.name}`}
                      >
                        <Rating
                          sx={
                            {
                              // backgroundColor: "white",
                            }
                          }
                          name="simple-controlled"
                          value={i.all_reviews_score}
                          onChange={handleRateItemOnClick(m, index)}
                        />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
            <br />
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
