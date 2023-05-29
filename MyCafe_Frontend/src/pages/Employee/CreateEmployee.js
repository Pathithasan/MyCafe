import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormLabel, Grid, TextField, IconButton, Select, MenuItem , InputLabel} from "@mui/material";
import EditTwoTone from "@mui/icons-material/EditTwoTone";
import { useContext, useEffect, useMemo, useState, React } from "react";
import { useForm, Controller } from "react-hook-form";
import { useApiData } from "../../custom-hooks/useApiData";
import { Context } from "../../context/store";
import dayjs from 'dayjs';
import DatePickerField from "../../components/DatePickerField";
import CustomSelect from "../../components/CustomSelect";

const CreateEmployee = () => {
    let apiData = useApiData();
    const { state, dispatch } = useContext(Context);
    const [open, setOpen] = useState(false);
    const [employeeData, setEmployeeData] = useState({});
    const [cafeData, setCafeData] = useState([]);
    const { control, register, handleSubmit, reset, errors } = useForm();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    useEffect(() => {
        apiData.getCafe({data: "some data"})
    }, []);

    useEffect(() => {
        setCafeData(state.cafeData);
    }, [state.cafeData]);

    function onSubmit(data) {  
        const update = apiData.createEmployee(data)
        .then(() => {
            alert('Employee created successfully!');
            
        })
        .catch((error) => {
            
            console.log('employee error ' + state.error);
            // alert(errorData);
            alert(state.error);
        });
          console.log("created------------->", update);
    }

    return (
        <>
            <Button type="button" variant="contained" color="primary" onClick={handleClickOpen}>Create</Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Add New Employee</DialogTitle>
                <DialogContent>
                <DialogContentText>Please enter the valid details of the new employee:</DialogContentText>
                    <form id="formEmployee" onSubmit={handleSubmit(onSubmit)} onReset={reset} noValidate autoComplete="off" fullWidth>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="outlined-basic"
                            label="ID"
                            name="id"
                            autoComplete="id"
                            placeholder="UIXXXXXXX"
                            autoFocus
                            
                            {...register("id")}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            placeholder="John Smith"
                            {...register("name")}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            type="email"
                            required
                            fullWidth
                            id=""
                            label="Email Address"
                            name="emailAddress"
                            autoComplete="emailAddress"
                            placeholder="john@email.com"
                            autoFocus
                            {...register("emailAddress")}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id=""
                            label="Phone Number"
                            name="phoneNumber"
                            autoComplete="phoneNumber"
                            autoFocus
                            
                            {...register("phoneNumber")}
                        />
                   
                        <CustomSelect
                        name="gender"
                        label="Gender"
                        control={control}
                        defaultValue={""}
                        options={
                            [   
                                { value: "Male", label: "Male" },    
                                { value: "Female", label: "Female" }
                            ]
                        }
                        />

                        <DatePickerField
                        name="startDate"
                        margin="normal"
                        control={control}
                        defaultValue={dayjs()}
                        label="Start Date"
                        />        
                        <CustomSelect
                        name="cafeId"
                        label="Cafe"
                        control={control}
                        options={cafeData.map((cafe) => ({
                                value: cafe.id,
                                label: cafe.name,
                              }))}
                        />

                        <Grid display={"flex"} justifyContent={"space-between"} mt={2} mb={1}>
                            <Button type="button" variant="contained" color="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                Save
                            </Button>
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CreateEmployee;
