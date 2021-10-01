import React, { useState } from "react";
import { TableBody, TableRow, TableCell, makeStyles, Paper, Divider, Grid, InputAdornment, Button } from '@material-ui/core';
import { isTemplateExpression } from "typescript";
import useTable from "../components/UseTable";
import AddButton from "../components/AddButton";
import SearchInput from "../components/SearchInput";


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
}))

// Table header information, id is the name of the 
// property to sort by when the header is clicked 
const headCells = [
    { id: 'issue', label: 'Issue' },
    { id: 'created', label: 'Created' },
    { id: 'due', label: 'Due' },
    { id: 'assigned', label: 'Assigned' },
    { id: 'status', label: 'Status' },
    { id: 'priority', label: 'Priority' },
    { id: 'severity', label: 'Severity' }

]

// initial set of rows, simulating Tickets data from the database
const list = [
    {
        id: "1",
        issue: "Everything is broken",
        created: "18-09-2021",
        due: "26-09-2021",
        assigned: "Martijns, Victor",
        status: " Open",
        priority: " 1",
        severity: " Critical"
    },
    {
        id: "2",
        issue: "No visual feedback on cancel button",
        created: "23-08-2021",
        due: "12-10-2021",
        assigned: "Janssen, Geert",
        status: " Open",
        priority: " 5",
        severity: " Very low"
    },
    {
        id: "3",
        issue: "My computer deleted my outlook e-mail program",
        created: "2-9-2021",
        due: "12-10-2021",
        assigned: "Martijns, Victor",
        status: " Reopened",
        priority: " 4",
        severity: " Marginal"
    },
    {
        id: "4",
        issue: "My computer deleted my outlook e-mail program",
        created: "2-9-2021",
        due: "12-10-2021",
        assigned: "Martijns, Victor",
        status: " Reopened",
        priority: " 4",
        severity: " Marginal"
    },
    {
        id: "5",
        issue: "My computer deleted my outlook e-mail program",
        created: "2-9-2021",
        due: "12-10-2021",
        assigned: "Martijns, Victor",
        status: " Reopened",
        priority: " 4",
        severity: " Marginal"
    },
    {
        id: "6",
        issue: "My computer deleted my outlook e-mail program",
        created: "2-9-2021",
        due: "12-10-2021",
        assigned: "Martijns, Victor",
        status: " Reopened",
        priority: " 4",
        severity: " Marginal"
    },
    {
        id: "7",
        issue: "My computer deleted my outlook e-mail program",
        created: "2-9-2021",
        due: "12-10-2021",
        assigned: "Martijns, Victor",
        status: " Reopened",
        priority: " 4",
        severity: " Marginal"
    }
];
export default function Tickets() {
    const [tickets, setTickets] = useState(list);
    const [filterFn, setFilterFn] = useState({ fn: (items: any) => { return tickets; } })
    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(tickets, headCells, filterFn);

    const classes = useStyles();

    const [searchText, setSearchText] = React.useState('');
    const [rows, setRows] = React.useState(list)



    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        let target = e.target;
        console.log("event", e);
        console.log("target value", target.value);
        setSearchText(target.value)
        setFilterFn({
            fn: items => {
                if (target.value == "") {
                    console.log("target value is null", items);
                    return items;
                }
                else {

                    return items.filter((x: { issue: string; }) => x.issue.toLowerCase().includes(target.value))
                }
            }

        })
    };

    return (

        <Paper className={classes.pageContent}>
            <Grid container>
                <AddButton variant="outlined" size="medium">+ New submit</AddButton>
                <Grid item sm={6}></Grid>
                <SearchInput placeholder={" Search..."} label={"search"} name={"search"} value={searchText} onChange={(e) => handleSearch(e)} />

            </Grid>

            <TblContainer>
                <TblHead />
                <Divider />
                <TableBody>
                    {
                        recordsAfterPagingAndSorting().map(item =>
                        (<TableRow key={item.id}>
                            <TableCell>{item.issue} </TableCell>
                            <TableCell>{item.created} </TableCell>
                            <TableCell>{item.due} </TableCell>
                            <TableCell>{item.assigned} </TableCell>
                            <TableCell>{item.status} </TableCell>
                            <TableCell>{item.priority} </TableCell>
                            <TableCell>{item.severity} </TableCell>
                        </TableRow>)
                        )
                    }
                </TableBody>
            </TblContainer>
            <TblPagination />
        </Paper>
    )

}
export { }

