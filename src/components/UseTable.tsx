import React, { useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableSortLabel, TablePagination } from '@mui/material';
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles({
    table: {
        marginTop: '70px',
        '& thead th': {
            fontWeight: '600',
        },
        '& tbody td': {
            fontWeight: '200',
        },
        '& tbody tr:hover': {
            backgroundColor: '#fffbf2',
            cursor: 'pointer',
        },
    },
})

export default function useTable(records: any[], headCells: any[], filterFn: { fn: (arg0: any) => any; }) {


    const classes = useStyles();
    const pages = [5, 10, 25];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(pages[page]);
    type Order = 'asc' | 'desc';
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof any>('');

    //The TblContainer component wil be on the top of the Table component
    const TblContainer = (props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
        <Table className={classes.table}>

            {props.children}
        </Table>)

    // The component TblHead is responsable for the creating of the head of the table
    const TblHead = () => {

        // handling sorting at single column level.
        // By click on the same column reverse the sort order
        const handleSortRequest = (cellId: number) => {
            let isAsc: boolean;
            isAsc = orderBy === cellId && order === "asc"
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(cellId)
        }

        return (<TableHead>
            <TableRow>
                {
                    headCells.map(headCell => (
                        <TableCell key={headCell.id}>
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={() => { handleSortRequest(headCell.id) }}>
                                {headCell.label}
                            </TableSortLabel>
                        </TableCell>))
                }
            </TableRow>
        </TableHead>)
    }



    function TblPagination() {

        const handleChangePage = (
            event: React.MouseEvent<HTMLButtonElement> | null,
            newPage: number,
        ) => {
            setPage(newPage);
        };

        const handleChangeRowsPerPage = (
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
        };

        return (
            <TablePagination
                component="div"
                rowsPerPageOptions={pages}
                count={records.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        );
    }
    function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
        // console.warn(a, b, orderBy)
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }


    function getComparator<Key extends keyof any>(
        order: Order,
        orderBy: Key,
    ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }



    // This method is created for cross-browser compatibility, if you don't
    // need to support IE11, you can use Array.prototype.sort() directly
    function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
        const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        // console.warn(stabilizedThis);
        return stabilizedThis.map((el) => el[0]);
    }




    const recordsAfterPagingAndSorting = () => {
        return stableSort(filterFn.fn(records), getComparator(order, orderBy))
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }

    return {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,

    }

}