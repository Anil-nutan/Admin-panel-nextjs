"use client";
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { Collapse } from '@mui/material';
import { AccountCircle, ExpandLess, SpaceDashboard,QueryStats, PeopleAlt, Work, Settings, HelpCenter, ContactMail, Support, DocumentScanner } from '@mui/icons-material';
import { ExpandMore } from '@mui/icons-material';
import Image from 'next/image';
import logo from './img.png'
import {useRouter, usePathname } from 'next/navigation';

const drawerWidth = 240;

function Layout(props) {
  const { window } = props;
  const { children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [IsCollapse, setIsCollapse] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  // console.log('pathname', pathname);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCollapse = () => {
    setIsCollapse(!IsCollapse);
  };

  const drawer = (
    <div>
      <Toolbar>
            <Image src={logo} height={45} width={45} alt='Logo' className='-ml-2 mr-2' />
        <Typography variant='h6' noWrap component="div" >
            User Name
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {['Dashboard', 'Analytics', 'Users', 'Projects','Messages','Settings','Profile'].map((text, index) => (
          <ListItem key={text} disablePadding className={pathname.startsWith("/" + text.toLowerCase()) ? "text-sky-600 bg-slate-100" : "text-slate-700"} onClick={() => {router.push("/" + text.toLowerCase())}}>
            <ListItemButton>
              <ListItemIcon className={pathname.startsWith("/" + text.toLowerCase()) ? "text-sky-600" : "text-slate-700"}>
                {index === 0 && <SpaceDashboard />}
                {index === 1 && <QueryStats />}
                {index === 2 && <PeopleAlt />}
                {index === 3 && <Work />}
                {index === 4 && <MailIcon />}
                {index === 5 && <Settings />}
                {index === 6 && <AccountCircle />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      <Divider />
          <ListItem disablePadding onClick={handleCollapse} className={pathname.startsWith("/more") ? "text-sky-600 bg-slate-100" : "text-slate-700"}>
            <ListItemButton>
              <ListItemIcon className={pathname.startsWith("/more") ? "text-sky-600 bg-slate-100" : "text-slate-700"}>
              <HelpCenter />
              </ListItemIcon>
              <ListItemText primary="More" />
              {IsCollapse? <ExpandMore />: <ExpandLess />}
            </ListItemButton>
          </ListItem>

      </List>
      <Collapse in={IsCollapse} timeout="auto" unmountOnExit>

      <List className='ml-4'>
        {['Support', 'Contact', 'Docs'].map((text, index) => (
            <ListItem key={text} disablePadding className={pathname.startsWith("/more") ? "text-sky-600 bg-slate-100 bg-slate-100" : "text-slate-700"}>
            <ListItemButton>
              <ListItemIcon className={pathname.startsWith("/more" ) ? "text-sky-600 bg-slate-100" : "text-slate-700"}>
                {index === 0 && <Support/>}
                {index === 1 && <ContactMail/>}
                {index === 2 && <DocumentScanner/>}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
        </Collapse>
    </div>
  );


  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "#ffffff",
          color: "#2f2f2f",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
          <main>{children}</main>
      </Box>
    </Box>
  );
}

Layout.propTypes = {
  window: PropTypes.func,
  children: PropTypes.array,
};

export default Layout;