import React, {useEffect, useState} from "react";
import {TableBody, TableCell, TableRow, Typography} from '@mui/material';
import useTable from "../components/UseTable";
import {AxiosResponse} from "axios";
import {TransportLayer} from "../transportation/TransportLayer";
import Project from "../domainObjects/Project";
import Button from "@mui/material/Button";
import ProjectForm from "../components/ProjectForm";

const transportLayer = new TransportLayer();
// Header information of the table, key is the name of the
// property to sort by when the header is clicked
const headCells = [
    {id: 'id', label: 'Id'},
    {id: 'name', label: 'Name'},
    {id: 'delete', label: 'Delete?'},
]

export default function Projects(props: any) {

    const [projects, setProjects] = useState<Project[]>([]);
    const [filterFn, setFilterFn] = useState({
        fn: (items: any) => {
            return projects;
        }
    })
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        resetPage
    } = useTable(projects, headCells, filterFn);
    const [, setSearchText] = React.useState('');
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [editProject, setEditProject] = useState<Project | null>(null);

    function fetchAllProjects() {
        transportLayer
            .getAllProjectPromise()
            .then((response: any) => {
                const allProjects: Project[] = response.data.map(
                    (responseElement: any) => new Project(responseElement)
                );
                setProjects(allProjects);
                setFilterFn({
                    fn: (allProjects) => {
                        return allProjects;
                    },
                });
            })
            .catch((response: AxiosResponse) => {
                // Handle error
            });
    }

    const handleSearch = (text: any): void => {
        resetPage()
        setSearchText(text)
        setFilterFn({
            fn: items => {
                if (text === "") return items;
                else return items.filter((x: { name: string; }) => x.name.toLowerCase().includes(text))
            }
        })
        setSearchText("");
    };

    function refreshProjects() {
        fetchAllProjects();
    }


    function onModalClose() {
        setModalIsOpen(false);
        refreshProjects();
    }

    function handleDeletePressed(project: Project) {
        transportLayer.deleteProject(project).then(r => refreshProjects())
    }

    function handleEditPressed(project: Project) {
        setEditProject(project);
        setModalIsOpen(true);
    }

    useEffect(fetchAllProjects, []);

    useEffect(() => {
        handleSearch(props.searchTextInput);
    }, [props]);

    return (
        <React.Fragment>
            <ProjectForm modalIsOpen={modalIsOpen} onClose={onModalClose} project={editProject}/>
            <Typography variant="h1">Projects</Typography>
            <TblContainer>
                <TblHead/>
                <TableBody>
                    {
                        recordsAfterPagingAndSorting().map(item =>
                            (<TableRow key={item.id} onClick={() => handleEditPressed(new Project(item))}>
                                <TableCell>{item.id} </TableCell>
                                <TableCell>{item.name} </TableCell>
                                <TableCell><Button
                                    onClick={() => handleDeletePressed(new Project(item))}>Delete</Button></TableCell>
                            </TableRow>))
                    }

                </TableBody>
            </TblContainer>
            <TblPagination/>
        </React.Fragment>
    )

}
export {}

