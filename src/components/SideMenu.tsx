import * as React from 'react';
import {styled, Theme, CSSObject} from '@mui/material/styles';

import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {Link} from "react-router-dom";

const openedSidebar = (theme: Theme): CSSObject => ({
    width: 250,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedSidebar = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
});

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            '#sidemenu & .MuiDrawer-paper': openedSidebar(theme),
        }),
        ...(!open && {
            '#sidemenu & .MuiDrawer-paper': closedSidebar(theme),
        }),
    }),
);

export default function SideMenu() {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
        (document.getElementById("content") as HTMLFormElement).classList.toggle("open");
    };

    const handleDrawerClose = () => {
        setOpen(false);
        (document.getElementById("content") as HTMLFormElement).classList.toggle("open");
    };

    const menu: { [index: string]: any } = {
        0: {
            "text": "Home",
            "element": <HomeIcon/>,
            "to": "/",
        },
        1: {
            "text": "Tickets",
            "element": <ListIcon/>,
            "to": "/tickets",
        },
        2: {
            "text": "Users",
            "element": <PersonOutlineIcon/>,
            "to": "/users",
        },
        3: {
            "text": "Settings",
            "element": <SettingsIcon/>,
            "to": "/settings",
        }
    }

    return (
        <div id="sidemenu">
            <Drawer variant="permanent" open={open}>
                <List>
                    {Object.keys(menu).map((key) => (
                        <ListItem button role="button" component={Link} to={menu[key]['to']} key={key}>
                            <ListItemIcon>
                                {menu[key]['element']}
                            </ListItemIcon>
                            <ListItemText primary={menu[key]['text']}/>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                {!open ? (
                    <ListItem button onClick={handleDrawerOpen}>
                        <ChevronRightIcon/>
                    </ListItem>
                ) : (
                    <ListItem button onClick={handleDrawerClose}>
                        <ChevronLeftIcon/>
                    </ListItem>
                )}
            </Drawer>
        </div>
    );
}