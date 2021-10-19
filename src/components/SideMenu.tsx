import * as React from 'react';

import {ChevronLeft, ChevronRight, Home, FormatListBulleted, Settings, PersonOutline} from '@mui/icons-material';
import {Drawer as MuiDrawer, List, Divider, ListItem, ListItemIcon, ListItemText, styled, Theme, CSSObject} from '@mui/material';
import {Link} from "react-router-dom";

// Open sidebar
const openedSidebar = (theme: Theme): CSSObject => ({
    width: 250,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    backgroundColor: '#F6F4F5',
    border: 0,
});

// Close sidebar
const closedSidebar = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    backgroundColor: '#F6F4F5',
    border: 0,
});

// Trigger close and open sidebar style changes
const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            '#side-menu & .MuiDrawer-paper': openedSidebar(theme),
        }),
        ...(!open && {
            '#side-menu & .MuiDrawer-paper': closedSidebar(theme),
        }),
    }),
);

export default function SideMenu() {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
        (document.getElementById("content") as HTMLFormElement).classList.toggle("open");
        (document.getElementById("top-header") as HTMLFormElement).classList.toggle("open");
    };

    const handleDrawerClose = () => {
        setOpen(false);
        (document.getElementById("content") as HTMLFormElement).classList.toggle("open");
        (document.getElementById("top-header") as HTMLFormElement).classList.toggle("open");
    };

    // map of menu items
    const menu: { [index: string]: any } = {
        0: {
            "text": "Home",
            "element": <Home/>,
            "to": "/",
        },
        1: {
            "text": "Tickets",
            "element": <FormatListBulleted/>,
            "to": "/tickets",
        },
        2: {
            "text": "Users",
            "element": <PersonOutline/>,
            "to": "/users",
        },
        3: {
            "text": "Settings",
            "element": <Settings/>,
            "to": "/settings",
        }
    }

    return (
        <div id="side-menu">
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
                        <ChevronRight/>
                    </ListItem>
                ) : (
                    <ListItem button onClick={handleDrawerClose}>
                        <ChevronLeft/>
                    </ListItem>
                )}
            </Drawer>
        </div>
    );
}