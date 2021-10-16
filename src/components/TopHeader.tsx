import * as React from 'react';
import Toolbar from "@mui/material/Toolbar";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import { AppBar, Button } from "@mui/material";
import SearchInput from './SearchInput';
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    appBarStyled: {

        background: '#fff',
        color: 'rgba(0, 0, 0, 0.54) !important',
        alignItems: 'flex-end',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        boxShadow: 'unset !important',

    },
    container_input_button: {

        display: 'flex',
        width: '60%',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },


    toolbar: {
        width: '80%',

    },
    icons: {
        marginLeft: 'auto',
    },
});


type HeaderProps = {
    placeholder?: string;
    label?: string;
    name?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

}



export default function TopHeader(props: HeaderProps) {


    const classes = useStyles();
    
    const renderInputField = () => {
        if (props.onChange) {
            return (<div className={classes.container_input_button}>
                <Button component={Link} to={"/add-ticket"} variant="outlined" size="medium">+ New submit</Button>
                <SearchInput placeholder={" Search..."} label={"search"} name={"search"} value={props.value ? props.value : ""} onChange={props.onChange} />
            </div>)

        }
    }
    
    return (

        <div id="topheader">

            <AppBar className={classes.appBarStyled}>
                <Toolbar className={classes.toolbar}>
                    {renderInputField()}
                    <div className={classes.icons}>
                        <HelpIcon />
                        <NotificationsIcon />
                        <AccountCircleIcon />
                    </div>
                </Toolbar>
            </AppBar>
        </div>

    );
}
 




