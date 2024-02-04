import React from 'react';
import { CustomDialogTitle, StyledDialogContent } from '../../Quotes/Quotes.style';
import { StyledInput, StyledLabel, UserCommentsDialogActions } from '../UserDetails.style';
import { Avatar, Button, Card, Dialog, Grid, Typography } from '@material-ui/core';
import { useHttpService } from '../../../services/useAxiosCustomHook';
import { useSnackbar } from '../../../utils/SnackBar';
import { useNavigate } from 'react-router-dom';
import { IMAGE_PATH } from '../../../constants/Constants';
import { IUser } from '../../../types/Types';
import { MarginDiv } from '../../Autherization/Login.style';

interface IProps
{
    openUploadDialog: true;
    setOpenUploadDialog: React.Dispatch<React.SetStateAction<boolean>>;
    file: File | null;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
    user: IUser;
    getUser: () => Promise<void>;
};

const UploadPhoto: React.FC<IProps> = ({ openUploadDialog, setOpenUploadDialog, file, setFile, user, getUser }) =>
{
    const { httpService } = useHttpService();
    const { showSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const handleUploadPhoto = async () =>
    {
        try
        {
            let formData = new FormData()

            formData.append("file", file ? file : "")

            const result: any = await httpService("post", "/api/upload/photo", formData);

            if (result && result.status === 1)
            {
                getUser();

                showSnackbar(result.message);
                setOpenUploadDialog(false);
            }
            else
            {
                showSnackbar(result.message);

                if (result.message === "Your token is expired. Login again :(")
                {
                    navigate("/");
                }
            }

        } catch (error: any)
        {
            showSnackbar(error.message);
        }
    };

    const handleClose = () =>
    {
        setFile(null);
        setOpenUploadDialog(false);
    };

    return (
        <Dialog
            open={ openUploadDialog }
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth
            maxWidth={ "sm" }
        >
            <CustomDialogTitle id="alert-dialog-slide-title">Upload profile photo</CustomDialogTitle>
            <StyledDialogContent>

                <Card square style={ { padding: "10px" } }>
                    <Grid container alignItems="center" justifyContent="center" direction="column">
                        <Grid item>
                            <Avatar src={ file ? URL.createObjectURL(file) : `${ IMAGE_PATH }/${ user.picture }` } alt="user" style={ { width: "150px", height: "150px" } } />
                        </Grid>

                        <Grid item>
                            <MarginDiv marginTop={ 20 }>
                                <StyledInput type="file" id="file" onChange={ (e: any) => setFile(e.target.files?.[0] || null) } accept="image/*" />
                                <StyledLabel htmlFor="file">
                                    <Typography>choose a file</Typography>
                                </StyledLabel>
                            </MarginDiv>
                        </Grid>
                    </Grid>
                </Card>

            </StyledDialogContent>
            <UserCommentsDialogActions>
                <Button onClick={ handleUploadPhoto } color="primary" variant="contained">
                    save
                </Button>

                <Button variant="outlined" onClick={ handleClose }>
                    close
                </Button>
            </UserCommentsDialogActions>
        </Dialog>
    )
}

export default UploadPhoto;
