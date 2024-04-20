import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { NavLink, useLocation } from "react-router-dom";

export default function Headers() {
  const location = useLocation();
  const pathName = location.pathname;
  console.log(pathName);
  const breadcrumbs = [
    <NavLink
      //   underline="hover"
      key="0"
      color="inherit"
      to="/"
      className={(navData) => (navData.isActive ? "active" : "")}
    >
      SELECT TAGS
    </NavLink>,
    <NavLink
      //   underline="hover"
      key="1"
      to="/learn-your-preference"
      className={(navData) => (navData.isActive ? "active" : "")}
    >
      LEARN YOUR PREFERENCE
    </NavLink>,
    <NavLink
      //   underline="hover"
      key="2"
      to="/items"
      className={(navData) => (navData.isActive ? "active" : "")}
    >
      RECOMMENDATION FOR YOU
    </NavLink>,
  ];

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      sx={{
        backgroundColor: "#171d25",
        padding: "20px",
        borderRadius: "5px",
      }}
    >
      <img
        alt="steam"
        width="176"
        height="44"
        src="https://store.cloudflare.steamstatic.com/public/shared/images/header/logo_steam.svg?t=962016"
      />

      <Stack spacing={2}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{
            color: "white",
          }}
        >
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
    </Stack>
  );
}
