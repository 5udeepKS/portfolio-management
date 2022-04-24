import React, { useState } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { loggedInLinks, loggedOutLinks } from "../../assets/links/navLinks";
import { logOut } from "../../redux/authSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const links = isLoggedIn ? loggedInLinks : loggedOutLinks;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {links.map((link, idx) => (
                <MenuItem
                  key={idx}
                  onClick={() => {
                    if (link.text === "Log Out") {
                      dispatch(logOut());
                    }
                    navigate(link.path);
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center">{link.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            PORTFOLIO MANAGEMENT
          </Typography>
          <Box
            sx={{
              width: "100%",
              height: "10vh",
              alignItems: "center",
              justifyContent: "space-between",
              display: { xs: "none", md: "flex" },
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              PORTFOLIO MANAGEMENT
            </Typography>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {links.map((link, idx) => (
                <Button
                  key={idx}
                  onClick={() => {
                    if (link.text === "Log Out") {
                      dispatch(logOut());
                    }
                    navigate(link.path);
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {link.text}
                </Button>
              ))}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
