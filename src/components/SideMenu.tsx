import React from 'react'
import { Divider, makeStyles, withStyles } from "@material-ui/core";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CSS from 'csstype';

const style: CSS.Properties = {
    display: 'flex',
    flexDirection: 'column',
    width: '15%',
    height: '40vh',
    backgroundColor: 'background.paper',
};

const BasicList = () => {
    return (
        <Box>
            <nav aria-label="main mailbox folders">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <ListIcon />
                            </ListItemIcon>
                            <ListItemText primary="Tickets" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <PersonOutlineIcon />
                            </ListItemIcon>
                            <ListItemText primary="Users" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Settings" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
        </Box>
    )
}
const SideMenu = () => {
    return (
        <div style={style}>            <BasicList />
        </div>
    )
}

export default SideMenu;


