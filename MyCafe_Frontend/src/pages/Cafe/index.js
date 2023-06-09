import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Grid, IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useApiData } from "../../custom-hooks/useApiData";
import { Context } from "../../context/store";
import { Link as RouterLink } from "react-router-dom";
import EditCafe from "./EditCafe";
import DeleteCafe from "./DeleteCafe";
import CreateCafe from "./CreateCafe";
import './Index.css';

const Cafe = () => {
    let apiData = useApiData();
    const { state, dispatch } = useContext(Context);
    const [rowData, setRowData] = useState([]);

   // const [anchorElUser, setAnchorElUser] = useState(null);
    useEffect(() => {
        apiData.getCafe({data: "some data"})
    }, []);

    useEffect(() => {
        setRowData(state.cafeData);
    }, [state.cafeData]);
    
     // Function to render the logo image as a preview
    const renderLogoPreview = (params) => {
        //const base64Logo = params.getValue("logo");
        const base64Logo = params.value;
        if (base64Logo) {
        return <img 
        src={base64Logo} 
        alt="Logo" 
        />;
        }
        return null;
    };
    return (
        <Container maxWidth="xl">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h1" component="h2">
                        Cafe
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2} mt={4}>
                <Grid item xs={12}>
                    <Typography variant="h4" component="h4">
                        Cafe Table
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ height: 800, width: "100%" }}>
                        <DataGrid
                            rows={rowData}
                            // columns={columns}
                            columns={[
                                //{ field: "id", headerName: "ID", width: 120 },
                                {
                                    field: "logo",
                                    headerName: "Logo",
                                    width: 120,
                                    editable: false,
                                    renderCell: renderLogoPreview, // Render the logo preview
                                    cellClassName: 'logoCell',
                                },
                                {
                                    field: "name",
                                    headerName: "Name",
                                    width: 150,          
                                    editable: false,
                                },
                                {
                                    field: "description",
                                    headerName: "Description",
                                    width: 250,
                                    editable: false,
                                },
                               
                                {
                                    field: "location",
                                    headerName: "Location",
                                    width: 250,
                                    editable: false,
                                },
                                {
                                    field: "employees",
                                    headerName: "Employees",
                                    type: "number",
                                    width: 120,
                                    align: "left",
                                    headerAlign: "left",
                                    editable: false,
                                },
                                {
                                    field: "action",
                                    headerName: "Action",
                                    width: 120,
                                    sortable: false,
                                    filterable: false,
                                    disableClickEventBubbling: true,
                                    renderCell: (params) => {
                                        return (
                                            <>
                                                <EditCafe cafeData={params.row} />
                                                <DeleteCafe cafeData={params.row} />
                                            </>
                                        );
                                    },
                                },
                            ]}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 5,
                                    },
                                },
                            }}
                            pageSizeOptions={[5]}
                            checkboxSelection
                            disableRowSelectionOnClick
                        />
                    </Box>
                </Grid>
                <Grid item xs={12}sx={{ textAlign: 'right' }}>
                    <CreateCafe />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Cafe;

// const columns = [
//     { field: "id", headerName: "ID", width: 120 },
//     {
//         field: "name",
//         headerName: "Name",
//         width: 150,
//         editable: false,
//     },
//     {
//         field: "description",
//         headerName: "Description",
//         width: 150,
//         editable: false,
//     },
//     {
//         field: "logo",
//         headerName: "Logo",
//         width: 180,
//         editable: false,
//         renderCell: renderLogoPreview, // Render the logo preview
//     },
//     {
//         field: "location",
//         headerName: "Location",
//         width: 120,
//         editable: false,
//     },
//     {
//         field: "employees",
//         headerName: "Employees",
//         type: "number",
//         width: 120,
//         editable: false,
//     },
//     {
//         field: "action",
//         headerName: "Action",
//         width: 120,
//         sortable: false,
//         filterable: false,
//         disableClickEventBubbling: true,
//         renderCell: (params) => {
//             return (
//                 <>
//                     <EditCafe cafeData={params.row} />
//                     <DeleteCafe cafeData={params.row} />
//                 </>
//             );
//         },
//     },
// ];





