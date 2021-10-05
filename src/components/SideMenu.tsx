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
import {makeStyles} from '@material-ui/core/styles';

const openedMixin = (theme: Theme): CSSObject => ({
    width: 250,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
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
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const useStyles = makeStyles({
    sidemenu_item: {
        display: 'flex !important',
        padding: '8px 16px !important',
        justifyContent: 'flex-start !important',
    },
});

export default function SideMenu() {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
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

    const classes = useStyles();

    return (
        <div id="sidemenu">
            <Drawer variant="permanent" open={open}>
                <List>
                    {Object.keys(menu).map((key) => (
                        <ListItem className={classes.sidemenu_item} button role="button" component={Link} to={menu[key]['to']}>
                            <ListItemIcon>
                                {menu[key]['element']}
                            </ListItemIcon>
                            <ListItemText primary={menu[key]['text']}/>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                {!open ? (
                    <ListItem className={classes.sidemenu_item} button onClick={handleDrawerOpen}>
                        <ChevronRightIcon/>
                    </ListItem>
                ) : (
                    <ListItem className={classes.sidemenu_item} button onClick={handleDrawerClose}>
                        <ChevronLeftIcon/>
                    </ListItem>
                )}
            </Drawer>
        </div>
    );
}