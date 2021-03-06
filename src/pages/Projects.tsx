import React, {useEffect, useState} from "react";
import {CircularProgress, TableBody, TableCell, TableRow, Typography} from '@mui/material';
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
    const [modalIsOpen, setModalIsOpen] = React.useState(false);

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
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
                setLoading(false)
            })
            .catch((response: AxiosResponse) => {
                // Handle error
                setLoading(false)
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

    function onModalClose() {
        setModalIsOpen(false);
        fetchAllProjects();
    }

    function handleDeletePressed(project: Project) {
        transportLayer.deleteProject(project).then(r => fetchAllProjects())
    }

    function handleEditPressed(project: Project) {
        setEditProject(project);
        setModalIsOpen(true);
    }

    window.addEventListener('load', () => {
        fetchAllProjects()
    });

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
                    { projects.length > 0 ? (
                        recordsAfterPagingAndSorting().map(item =>
                            (<TableRow key={item.id} onClick={(e) => {
                                const target = e.target as Element;
                                if(target.getAttribute('type') !== 'button') {
                                    handleEditPressed(new Project(item))
                                }
                            }}>
                                <TableCell>{item.id} </TableCell>
                                <TableCell>{item.name} </TableCell>
                                <TableCell><Button
                                    onClick={() => {
                                        if (window.confirm('Are you sure to delete this project?')) {
                                            handleDeletePressed(new Project(item))
                                        }
                                    }}>Delete</Button></TableCell>
                            </TableRow>))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={100}>
                                {loading ? (
                                    <CircularProgress/>
                                ) : (
                                    "No data found"
                                )}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </TblContainer>
            <TblPagination/>
        </React.Fragment>
    )

}
export {}

