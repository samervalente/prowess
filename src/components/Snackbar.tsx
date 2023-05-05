import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  export default function CustomizedSnackbars({severity, open, message, handleClose}: {severity: "warning" | "error" | "info" | "success", message: string, open: boolean, handleClose: () => void}) {
   
  

  
    return (
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} key={"bottom" + "left"}>
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}> 
           {message}
          </Alert>
        </Snackbar>
      </Stack>
    );
  }