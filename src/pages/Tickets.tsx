import React, { useEffect, useState } from "react";
import {
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import useTable from "../components/UseTable";
import { TransportLayer } from "../transportation/TransportLayer";
import Ticket from "../domainObjects/Ticket";
import { AxiosResponse } from "axios";
import moment from "moment";
import ViewTicket from "../components/viewTicket/ViewTicket";
import EditTicket from "./EditTicket";

// Table header information, id is the name of the
// property to sort by when the header is clicked
const headCells = [
  { id: "id", label: " Number" },
  { id: "title", label: "Title" },
  { id: "description", label: "Description" },
  { id: "project_name", label: "Project"},
  { id: "dueDate", label: "Due" },
  { id: "createDate", label: "Created" },
  { id: "updateDate", label: "Updated" },
];
const maxCaracteresToDisplay = 200;
const transportLayer = new TransportLayer();

export default function Tickets(props: any) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items: any) => {
      return tickets;
    },
  });
  const [rowClicked, setRowClicked] = useState<number | null>(1);
  const [modalOpen, setModalOpen] = useState(false);

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting, resetPage } =
    useTable(tickets, headCells, filterFn);
  const [, setSearchText] = React.useState("");
  const [modalEditTicketOpen, setModalEditTicketOpen] = useState(false);

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
          return items.filter((x: { title: string,
                                    description: string,
                                    dueDate: Date,
                                    createdDate: Date,
                                    updatedDate: Date }) =>
            x.title.toLowerCase().includes(text)
            || x.description.toLowerCase().includes(text)
            || moment(x.dueDate).format("DD-MM-YYYY").includes(text)
            || moment(x.createdDate).format("DD-MM-YYYY").includes(text)
            || moment(x.updatedDate).format("DD-MM-YYYY").includes(text)
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
  function displayCountCaracteres(text: string, count: number){
    return (text.length > count) ? text.substring(0, count): text
  }

  function onEditTicket() {
    setModalOpen(false);
    setModalEditTicketOpen(true);
  }
  function onModalEditTicketClose() {
    setModalEditTicketOpen(false);
  }

  return (
    <React.Fragment>
      <ViewTicket
        ticketId={rowClicked}
        modalIsOpen={modalOpen}
        onClose={onModalClose}
        onEdit={onEditTicket}
      />
      <EditTicket
        modalIsOpen={modalEditTicketOpen}
        onClose={onModalEditTicketClose}
        ticketId={rowClicked}
      />
      <Typography variant="h1">Tickets</Typography>
      <TblContainer>
        <TblHead />
        <TableBody>
          {recordsAfterPagingAndSorting().map((item) => (
            <TableRow key={item.id} onClick={() => handleClickEvent(item.id)}>
              <TableCell>{item.id} </TableCell>
              <TableCell>{item.title} </TableCell>
              <TableCell>
                {displayCountCaracteres(item.description as string, maxCaracteresToDisplay)}
              </TableCell>
              <TableCell>{item.project_name} </TableCell>
              <TableCell>
                {moment((item.dueDate),("DD-MM-YYYY")).isValid() ? moment(item.dueDate).format("DD-MM-YYYY") : " "}              
              </TableCell>
              <TableCell>
                {moment((item.createdDate), ("DD-MM-YYYY")).isValid() ? moment(item.createdDate).format("DD-MM-YYYY") : " "}
              </TableCell>
              <TableCell>
                {moment((item.updatedDate), ("DD-MM-YYYY")).isValid() ? moment(item.updatedDate).format("DD-MM-YYYY") : " "}
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
