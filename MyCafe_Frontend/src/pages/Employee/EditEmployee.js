import {Button, Dialog, DialogContent, DialogContentText, DialogTitle, FormControl, FormLabel, Grid, TextField, IconButton,} from "@mui/material";
import EditTwoTone from "@mui/icons-material/EditTwoTone";
import { useContext, useEffect, useMemo, useState, React } from "react";
import { useForm, Controller } from "react-hook-form";
import { useApiData } from "../../custom-hooks/useApiData";
import { Context } from "../../context/store";
import dayjs from 'dayjs';
import DatePickerField from "../../components/DatePickerField";
import CustomSelect from "../../components/CustomSelect";
//import * as React from 'react';

const EditEmployee = ({employee}) => {
    let apiData = useApiData();
    const { state, dispatch } = useContext(Context);
    const [open, setOpen] = useState(false);
    const [employeeData, setEmployeeData] = useState({});
    const [cafeData, setCafeData] = useState([]);


    const { control, register, handleSubmit, reset, errors, setValue } = useForm();

    const [selectedCafe, setSelectedCafe] = useState('');

    const handleCafeSelectChange = (event) => {
    setSelectedCafe(event.target.value);
    };
    const [selectedGender, setSelectedGender] = useState('');

    const handleGenderSelectChange = (event) => {
    setSelectedGender(event.target.value);
    };
    const handleClickOpen = () => {
        
        apiData.getEmployee(employee.id)
          .then((data) => {
            console.log(data)
            setEmployeeData({...data});
        
            console.log('emplyee gender: ' + employeeData.gender);
            setOpen(true);
          })
          .catch((err) => {
            console.error(err);
          });
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

    useEffect(() => {
        if (employeeData) {
            console.log(employeeData)
            console.log('set emplyee gender: ' + employeeData.gender);
          Object.keys(employeeData).forEach((key) => {
            setValue(key, employeeData[key]);
          });
        }
      }, [employeeData, setValue]);
      
    // useEffect(() => {
    //     setValue("name", employeeData.name);
    //     setValue("id", employeeData.id);
    // }, [employeeData, setValue]);

    function onSubmit(data) {  
        const update = apiData.updateEmployee(employeeData.id, data)
        .then(() => {
            alert('Employee updated successfully!');
            
        })
        .catch((error) => {
            
            console.log('employee error ' + state.error);
            // alert(errorData);
            alert(state.error);
        });
          console.log("updated------------->", update);
    }

    return (
        <>
            <IconButton color="inherit" size="small" onClick={handleClickOpen}>
                <EditTwoTone fontSize="small" />
            </IconButton>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Edit Employee</DialogTitle>
                <DialogContent>
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
                        defaultValue={employeeData["gender"]}
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
                        defaultValue={dayjs(employeeData.startDate)}
                        label="Start Date"
                        />        
                        <CustomSelect
                        name="cafeId"
                        label="Cafe"
                        control={control}
                        defaultValue={employeeData["cafeId"]}
                        
                        options={cafeData.map((cafe) => ({
                                value: cafe.id,
                                label: cafe.name,
                              }))}
                        />

{/*                            
                        <InputLabel id="cafe-label" sx={{mt:"1rem"}} >Cafe</InputLabel>  
                        <Select
                            //variant="outlined"
                            //margin="normal"
                            labelId="cafe-label"
                            required
                            fullWidth
                            id="gender-select"
                            label="Cafe"
                            autoComplete="cafeId"
                            autoFocus
                            
                            onChange={handleCafeSelectChange} 
                            defaultValue={employeeData["cafeId"] ?? 0}
                            {...register("cafeId")}
                            // options={cafeData.map((cafe) => ({
                            //     value: cafe.id,
                            //     label: cafe.name,
                            //     name: cafe.name
                            //   }))}
                        > 
                             {cafeData.map((cafe) => (
                                <MenuItem key={cafe.id} value={cafe.id}>
                                    {cafe.name}
                                </MenuItem>
                             ))}
                        </Select> */}
                        <Grid display={"flex"} justifyContent={"space-between"} mt={2} mb={1}>
                            <Button type="button" variant="contained" color="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                Update
                            </Button>
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default EditEmployee;
