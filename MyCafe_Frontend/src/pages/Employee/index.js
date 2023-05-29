import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Grid, IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useApiData } from "../../custom-hooks/useApiData";
import { Context } from "../../context/store";
import { Link as RouterLink } from "react-router-dom";
import EditEmployee from "./EditEmployee";
import DeleteEmployee from "./DeleteEmployee";
import CreateEmployee from "./CreateEmployee";


const Employee = () => {
    let apiData = useApiData();
    const { state, dispatch } = useContext(Context);
    const [rowData, setRowData] = useState([]);

   // const [anchorElUser, setAnchorElUser] = useState(null);
    useEffect(() => {
        console.log("api calling")
        apiData.getEmployees({data: "some data"})
    }, []);

    useEffect(() => {
        console.log("set row data")
        setRowData(state.employeeData);
    }, [state.employeeData]);
    
    return (
        <Container maxWidth="xl">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h1" component="h2">
                        Employee
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2} mt={4}>
                <Grid item xs={12}>
                    <Typography variant="h4" component="h4">
                        Employee Table
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ height: 400, width: "100%" }}>
                        <DataGrid
                            rows={rowData}
                            columns={columns}
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
                    <CreateEmployee />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Employee;

const columns = [
    { 
        field: "id", 
        headerName: "ID", 
        width: 120,
        editable: false, 
    },
        
    {
        field: "name",
        headerName: "Name",
        width: 150,
        editable: false,
    },
    {
        field: "emailAddress",
        headerName: "Email Address",
        width: 150,
        editable: false,
    },
    {
        field: "phoneNumber",
        headerName: "Phone Number",
        width: 150,
        editable: false,
    },
    {
        field: "cafe",
        headerName: "Cafe",
        width: 120,
        editable: false,
    },
    {
        field: "daysWorked",
        headerName: "Days Worked",
        type: "number",
        width: 120,
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
                    <EditEmployee employee={{...params.row}} />
                    <DeleteEmployee employeeData={params.row} />
                </>
            );
        },
    },
];


