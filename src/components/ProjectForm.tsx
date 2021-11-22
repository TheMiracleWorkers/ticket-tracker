import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import * as yup from "yup";
import {useFormik} from "formik";
import Button from "@mui/material/Button";
import {Modal, Stack, Box} from "@mui/material";
import {TransportLayer} from '../transportation/TransportLayer';
import Project, {ProjectInterface} from "../domainObjects/Project";
import { SxProps } from "@mui/system";

const validationSchema = yup.object({
    name: yup
        .string()
        .min(3, 'Project name should be of minimum 3 characters length')
        .required('project name is required'),
});

export default function ProjectForm(props: {
    onClose: Function;
    modalIsOpen: boolean;
    project?: Project | undefined;
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

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {            
            const newProject = new Project({
                'name': values.name,
            });
            transportLayer.postProject(newProject).catch(err => {
                // TODO: Show error
            }).then(res =>{
                formik.resetForm();
                props.onClose();                
            });                        
        },
    });

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
                                    <Button color="primary" variant="outlined" onClick={() => props.onClose()}>
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
