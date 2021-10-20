import React from "react"
import { InputBase, InputBaseProps } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    border: '1px solid #000',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(0),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    right: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRi: 0,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 3),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(1)})`,
        width: '100%',
    },
}));

interface Props extends InputBaseProps {
    placeholder: string;
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const searchInput: React.FC<Props> = ({
    placeholder,
    label,
    name,
    value,
    onChange,

}) => {

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
        </Search>)
}

export default searchInput;