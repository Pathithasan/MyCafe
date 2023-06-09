import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormLabel, Grid, TextField} from "@mui/material";
import { useContext, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useApiData } from "../../custom-hooks/useApiData";
import { Context } from "../../context/store";
import FileInput from "../../components/FileInput";

  const CreateCafe = () => {
    let apiData = useApiData();
    const { state, dispatch } = useContext(Context);
    const [open, setOpen] = useState(false);
  
    // const { register, handleSubmit, reset, errors } = useForm();
    const { register, handleSubmit, reset, formState: { errors } , setValue, control} = useForm();
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      reset();
    };
  
    function onSubmit(data) {
      const result = apiData
        .createCafe(data)
        .then(() => {
          alert("Cafe added successfully!");
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
      console.log("Added------------->", result);
    }
  
    return (
        <>
         <Button type="button" variant="contained" color="primary" onClick={handleClickOpen}>Create</Button>
            
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Add New Cafe</DialogTitle>
                <DialogContent>
                <DialogContentText>Please enter the details of the new cafe:</DialogContentText>
                    <form id="formCafe" onSubmit={handleSubmit(onSubmit)} onReset={reset} noValidate autoComplete="off">
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            autoComplete="name"
                            autoFocus
                            placeholder="Sips Cafe"
                            {...register("name")}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id=""
                            label="Description"
                            autoComplete="description"
                            autoFocus
                            placeholder={"Soups and salads for the lunch crowd"}
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
                            placeholder={"Crawford Ln, #01-63, Singapore"}
                            {...register("location")}
                        />
                        <FileInput
                            name="logo"
                            control={control}
                            label="Logo"
                            onFileSelect={(file) => setValue("logo", file)}
                            accept="image/*"
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
  
  export default CreateCafe;
  
