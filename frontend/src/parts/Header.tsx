import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import "./header.css";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuItemClick = (route: string) => {
    navigate(route);
    setDrawerOpen(false); // Close drawer after navigation
  };

  return (
    <Box>
      <AppBar position="fixed" className="header-appbar">
        <Toolbar
          className="header-toolbar"
          sx={{ backgroundColor: "green.400" }}
        >
          <div className="flex flex-row items-center gap-3">
            <a href="/">
            </a>
            <Typography variant="h6" className="header-title">
              {title}
            </Typography>
          </div>
          <IconButton
            edge="end"
            aria-label="menu"
            onClick={handleDrawerToggle}
            className="header-menu-icon"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* Drawer as Sidebar */}
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        <List className="drawer-list">
            <ListItem component="li" button onClick={() => handleMenuItemClick("/")}>
                <ListItemText primary="Menu" />
            </ListItem>


        </List>
      </Drawer>
    </Box>
  );
};

export default Header;
