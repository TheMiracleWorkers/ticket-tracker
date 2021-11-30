import * as React from 'react';
import {useEffect} from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import * as yup from "yup";
import {useFormik} from "formik";
import Button from "@mui/material/Button";
import {Box, Modal, Stack} from "@mui/material";
import {TransportLayer} from '../transportation/TransportLayer';
import Project from "../domainObjects/Project";
import {SxProps} from "@mui/system";

const validationSchema = yup.object({
    name: yup
        .string()
        .min(3, 'Project name should be of minimum 3 characters length')
        .required('project name is required'),
});

export default function ProjectForm(props: {
    onClose: Function;
    modalIsOpen: boolean;
    project?: Project | null;
}) {
    const transportLayer = new TransportLayer();

    const boxStyle: SxProps = {
        position: "relative",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "1px solid #000",
        boxShadow: 24,
        p: 4,
    };

    function closeForm() {
        formik.resetForm();
        props.onClose();
    }

    function addProject(values: any) {
        const newProject = new Project({
            'name': values.name,
        });
        transportLayer.postProject(newProject).catch(err => {
            // TODO: Show error
        }).then(res => {
            closeForm();
        });
    }

    function updateProject(project: any, values: any) {
        project.name = values.name;

        transportLayer.updateProjectPromise(project).catch(err => {
            // TODO: Show error
        }).then(res => {
            closeForm();
        });
    }

    const formik = useFormik({
        initialValues: {
            name: props.project ? props.project.name : '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (props.project) {
                updateProject(props.project, values);
            } else {
                addProject(values);
            }
        },
    });

    useEffect(() => {
        if (props.project) {
            formik.setFieldValue('name', props.project?.name);
        }
    }, [props.project, formik]);

    return (
        <React.Fragment>
            <Modal open={props.modalIsOpen}>
                <Box sx={boxStyle}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    id="name"
                                    name="name"
                                    label="Name"
                                    fullWidth
                                    variant="standard"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                            </Grid>


                            <Grid item xs={12}>
                                <Stack spacing={2} direction="row">
                                    <Button color="primary" variant="contained" type="submit">
                                        Submit
                                    </Button>
                                    <Button color="primary" variant="outlined" onClick={() => closeForm()}>
                                        Cancel
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Modal>
        </React.Fragment>
    );
}
