import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { Grid, IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

interface SnackbarContextProps
{
    showSnackbar: (message: string) => void;
}

export const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined);

export const useSnackbar = () =>
{
    const context = useContext(SnackbarContext);
    if (!context)
    {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};

const useStyles = makeStyles((theme: Theme) => ({
    customSnackbar: {
        padding: '12px',
        backgroundColor: 'brown',
        color: '#fff',
        // Add any additional styles as needed
    },
    closeButton: {
        color: '#fff',
    },
}));

const CustomSnackbar: React.FC<{ open: boolean; message: string; onClose: () => void }> = ({ open, message, onClose }) =>
{
    const classes = useStyles();

    return (
        <Snackbar
            open={ open }
            autoHideDuration={ 6000 }
            onClose={ onClose }
            anchorOrigin={ { vertical: 'bottom', horizontal: 'center' } }
        >
            <div className={ classes.customSnackbar }>
                <Grid container justifyContent="space-between" alignItems="center" alignContent="center" spacing={2}>
                    <Grid item>
                        <Typography variant="body1">{ message }</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton size="small" className={ classes.closeButton } onClick={ onClose }>
                            <CloseIcon style={{color: "gray"}} />
                        </IconButton>
                    </Grid>
                </Grid>

            </div>
        </Snackbar>
    );
};

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) =>
{
    // const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleClose = () =>
    {
        setOpen(false);
    };

    const showSnackbar = (newMessage: string) =>
    {
        setMessage(newMessage);
        setOpen(true);
    };

    useEffect(() =>
    {
        if (open)
        {
            const timer = setTimeout(() =>
            {
                setOpen(false);
            }, 6000); // Adjust the duration as needed
            return () => clearTimeout(timer);
        }
    }, [open]);

    return (
        <SnackbarContext.Provider value={ { showSnackbar } }>
            { children }
            <CustomSnackbar open={ open } message={ message } onClose={ handleClose } />
        </SnackbarContext.Provider>
    );
};
