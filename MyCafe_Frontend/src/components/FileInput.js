import { useState, useEffect } from "react";
import { Button , InputLabel , Box, FormControl, TextField} from '@mui/material';

const FileInput = ({ label, accept, defaultValue, onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState(defaultValue);
  const [imageUrl, setFileUrl] = useState(defaultValue);

  // useEffect(() => {
  //   if (selectedFile) {
  //     setFileUrl(URL.createObjectURL(selectedFile));
  //   }
  // }, [selectedFile]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      const fileData = event.target.result;
      setFileUrl(fileData); // Set the image data directly as the file URL
      onFileSelect(fileData); // Call the callback prop with the image data
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setFileUrl(null);
    onFileSelect(null);
  };


  return (
    <div>
      <div>
      <InputLabel>{label + " *"}</InputLabel>
      </div>
        <Box sx={{ minWidth: 120, mb: 1,p: 1, border: '1px solid',  borderRadius: 1,borderColor: (theme) =>
        theme.palette.mode === 'dark' ? 'grey.800' : 'grey.400', }}> 
        <input
          margin ="normal"
          accept={accept}
          type="file"
          id="select-image"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {/* <Box display="flex" alignItems="center" margin="normal"> */}
        <Box display="flex" alignItems="center" justifyContent="space-between" margin="normal">
          <label htmlFor="select-image">
            <Button variant="contained" sx={{ backgroundColor: "grey", color: "white" }} component="span">
              Upload Image
            </Button>
          </label>
          {imageUrl && selectedFile && (
            <Box ml={2} textAlign="center">
            {/* <Box display="flex" alignItems="center" justifyContent="center"> */}
              <div>Image Preview:</div>
              <img src={imageUrl} alt={selectedFile.name} height="100px" />
            </Box>
          )}
          {imageUrl && selectedFile && (
              <Button variant="contained" color="error"  onClick={handleRemoveImage}>
                Remove
              </Button>
          )}
        </Box>

      </Box>
      </div>
    
  );
};


export default FileInput;
