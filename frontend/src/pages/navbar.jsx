import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, CssBaseline, List, ListItem, ListItemIcon, ListItemText, Drawer, AppBar, Toolbar } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';  // For navigation
import AdminDashboard from './AdminDashboard';
import Menu from './Menu'
import Order from './OrderPage'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ScheduleIcon from '@mui/icons-material/Schedule';
import OrderPage from './OrderPage';

// Navigation items for the navbar
const NAVIGATION = [
  {
    title: 'Menu',
    icon: <MenuBookIcon />,
    link: '/dashboard', 
  },
  {
    title: 'Order',
    icon: <ShoppingCartIcon />,
    link: '/order',
  },
  {
    title: 'Schedule',
    icon: <ScheduleIcon />,
    link: '/schedule',
  },
  {
    title: 'Admin Dashboard',
    icon: <DashboardIcon />,
    link: '/admin',
  },
  
];

// Theme configuration (optional)
const drawerWidth = 240;

// Renders the actual content based on the selected route
function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {pathname === '/dashboard' && <Menu/>}
      {pathname === '/admin' && <AdminDashboard />}  {/* Admin Dashboard rendered */}
      {pathname === '/order' && <OrderPage/>}
      {pathname === '/inventory' && (
        <Typography>Inventory content for {pathname}</Typography>
      )}
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

// Main layout component with Material UI Drawer (sidebar)
function DashboardLayoutBasic({ children }) {
  const [pathname, setPathname] = React.useState('/dashboard');

  // Mock navigation handler (this can be replaced with proper routing)
  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* AppBar to hold the top navigation bar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard Template
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer (sidebar) for navigation links */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {NAVIGATION.map((item, index) => (
            <ListItem button key={index} component={Link} to={item.link}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        {/* This will render the content of the current route */}
        {children}
      </Box>
    </Box>
  );
}

DashboardLayoutBasic.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayoutBasic;
