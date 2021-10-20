import React, { useEffect, useState } from "react";
import {
  TableBody,
  TableRow,
  TableCell,
  Divider,
  Typography,
} from "@mui/material";
import useTable from "../components/UseTable";
import { TransportLayer } from "../transportation/TransportLayer";
import Ticket from "../domainObjects/Ticket";
import { AxiosResponse } from "axios";
import moment from "moment";
import ViewTicket from "../components/viewTicket/ViewTicket";

// Table header information, id is the name of the
// property to sort by when the header is clicked
const headCells = [
  { id: "id", label: " Number" },
  { id: "title", label: "Title" },
  { id: "description", label: "Description" },
  { id: "dueDate", label: "Due" },
  { id: "createDate", label: "Created" },
  { id: "updateDate", label: "Updated" },
];

const transportLayer = new TransportLayer();

export default function Tickets(props: any) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items: any) => {
      return tickets;
    },
  });
  const [rowClicked, setRowClicked] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting, resetPage } =
    useTable(tickets, headCells, filterFn);
  const [searchText, setSearchText] = React.useState("");

  useEffect(() => {
    fetchAllTicket();
  }, []);

  useEffect(() => {
    resetPage();
    handleSearch(props.searchTextInput);
  }, [props]);

  function fetchAllTicket() {
    transportLayer
      .getAllTicketsPromise()
      .then((response: any) => {
        const allTickets: Ticket[] = response.data.map(
          (responseElement: any) => new Ticket(responseElement)
        );
        setTickets(allTickets);
        setFilterFn({
          fn: (allTickets) => {
            return allTickets;
          },
        });
      })
      .catch((response: AxiosResponse) => {
        // Handle error
      });
  }

  const handleSearch = (text: any): void => {
    setSearchText(text);
    setFilterFn({
      fn: (items) => {
        if (text === "") return items;
        else
          return items.filter((x: { title: string }) =>
            x.title.toLowerCase().includes(text)
          );
      },
    });
  };

  function handleClickEvent(ticketId: number | string) {
    const id = ticketId as number;
    setRowClicked(id);
    setModalOpen(true);
    console.log(id);
    console.log(rowClicked);
  }

  function onModalClose() {
    setModalOpen(false);
  }

  return (
    <React.Fragment>
      <ViewTicket
        ticketId={rowClicked}
        modalIsOpen={modalOpen}
        onClose={onModalClose}
      />
      <Typography variant="h1">Tickets</Typography>
      <TblContainer>
        <TblHead />
        <Divider />
        <TableBody>
          {recordsAfterPagingAndSorting().map((item) => (
            <TableRow key={item.id} onClick={() => handleClickEvent(item.id)}>
              <TableCell>{item.id} </TableCell>
              <TableCell>{item.title} </TableCell>
              <TableCell>{item.description} </TableCell>
              <TableCell>
                {moment(item.dueDate).format("DD-MM-YYYY")}{" "}
              </TableCell>
              <TableCell>
                {moment(item.createDate).format("DD-MM-YYYY")}{" "}
              </TableCell>
              <TableCell>
                {moment(item.updateDate).format("DD-MM-YYYY")}{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />
    </React.Fragment>
  );
}
export {};
