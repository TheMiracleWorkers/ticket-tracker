
import React, { ReactElement, FC } from "react";

import { Button as MuiButton, makeStyles, ButtonProps } from "@material-ui/core";


interface IButtonProps extends ButtonProps {
    fontSize?: "small" | "medium" | "large";
}

const useStyles = makeStyles(theme => ({

    root: {
        margin: theme.spacing(0.5)
    },
    small: {
        fontSize: "0.7em"
    },
    medium: {
        fontSize: "1.0em"
    },
    large: {
        fontSize: "1.4em"
    }
}));

function Button({ fontSize = "medium", children, ...rest }: IButtonProps) {
    const classes = useStyles();
    return (
        <MuiButton classes={{ label: classes[fontSize] }} {...rest}>
            {children}
        </MuiButton>
    );
}

export default Button;