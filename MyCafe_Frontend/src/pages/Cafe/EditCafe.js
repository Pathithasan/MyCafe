import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormLabel, Grid, TextField, IconButton} from "@mui/material";
import EditTwoTone from "@mui/icons-material/EditTwoTone";
import { useContext, useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useApiData } from "../../custom-hooks/useApiData";
import { Context } from "../../context/store";
import FileInput from "../../components/FileInput";

const EditCafe = ({ cafeData }) => {
    let apiData = useApiData();
    const { state, dispatch } = useContext(Context);
    const [open, setOpen] = useState(false);
    
    const { control, register, handleSubmit, reset, errors, setValue } = useForm({
        defaultValues: useMemo(() => {
            return cafeData;
        }, [cafeData]),
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    function onSubmit(data) {  
        const update = apiData.updateCafe(cafeData.id, data)
        .then(() => {
            alert('Cafe updated successfully!');
            
        })
        .catch((error) => {
            
            console.log('cafe error ' + state.error);
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
                <DialogTitle>Edit Cafe</DialogTitle>
                <DialogContent>
                    <form encType="multipart/form-data" id="formCafe" onSubmit={handleSubmit(onSubmit)} onReset={reset} noValidate autoComplete="off">
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
                            //type="email"
                            required
                            fullWidth
                            id=""
                            label="Description"
                            name="description"
                            autoComplete="description"
                            autoFocus
                            {...register("description")}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id=""
                            label="Location"
                            name="location"
                            autoComplete="location"
                            autoFocus
                            {...register("location")}
                        />
                       <FileInput
                            name="logo"
                            control={control}
                            label="Logo"
                            onFileSelect={(file) => setValue("logo", file)}
                            accept="image/*"
                            defaultValue={cafeData["logo"]}
                        />
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

export default EditCafe;
