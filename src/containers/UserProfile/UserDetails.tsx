import React from 'react';

// external libraries
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// material-ui
import { Avatar, Button, Card, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// local
import { StyledFab, StyledTypography, StyledUserDiv } from './UserDetails.style';
import CommentedQuotes from './components/CommentedQuotes';
import AddedQuotes from './components/AddedQuotes';
import { useHttpService } from '../../services/useAxiosCustomHook';
import { useSnackbar } from '../../utils/SnackBar';
import UploadPhoto from './components/UploadPhoto';
import { BASE_PATH } from '../../constants/Constants';
import AddQuote from './components/AddQuote';
import { MarginDiv } from '../Autherization/Login.style';
import EditIcon from '@material-ui/icons/Edit';

type IUser = {
    username: string,
    email: string,
    picture: any
}

const Profile: React.FC = () =>
{
    const { httpService } = useHttpService();
    const { showSnackbar } = useSnackbar();
    const navigate = useNavigate();

    // Function to convert ArrayBuffer to base64
    function arrayBufferToBase64(buffer: any)
    {
        const binary = new Uint8Array(buffer);
        const bytes = new Uint8Array(buffer);
        let binaryString = '';
        for (let i = 0; i < bytes.byteLength; i++)
        {
            binaryString += String.fromCharCode(bytes[i]);
        }
        return btoa(binaryString);
    }

    // const authUser = JSON.parse(Cookies.get('authUser') ?? "null");

    const [user, setUser] = React.useState<IUser>({
        username: "",
        email: "",
        picture: null
    });

    const [openCommentedQuotesCard, setOpenCommentedQuotesCard] = React.useState<boolean>(false);

    const [openUserAddedQuotes, setOpenUserAddedQuotes] = React.useState<boolean>(false);

    const [openUploadDialog, setOpenUploadDialog] = React.useState<boolean>(false);

    const [openQuoteDialog, setOpenQuoteDialog] = React.useState<boolean>(false);

    const [file, setFile] = React.useState<File | null>(null);

    const getUser = async () =>
    {
        try
        {
            const result: any = await httpService("get", "/api/get/user");

            if (result && result.status === 1)
            {
                let user = result.data?.user

                if (!user)
                {
                    showSnackbar("User not found!")
                    return;
                }

                setUser(result.data?.user);
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
            showSnackbar(error.message)
        }
    }

    React.useEffect(() =>
    {
        getUser();
    }, [])

    const handleLogout = async () =>
    {
        try
        {
            const logoutRes: any = await httpService("post", "/auth/logout")

            if (!logoutRes || logoutRes.status !== 1)
            {
                showSnackbar(logoutRes?.message);
                return;
            }

            Cookies.remove('authToken');
            Cookies.remove('authUser');

            navigate('/');

        } catch (error: any)
        {
            showSnackbar(error?.message);
        }
    }

    const handleOpenUpload = () =>
    {
        setOpenUploadDialog(true);

    };

    const openAddQuote = () =>
    {
        setOpenQuoteDialog(true)
    };

    return (
        <React.Fragment>
            <Grid container alignContent="center" alignItems="center" justifyContent="center" direction="column">
                <Grid item>
                    <Avatar src={ `${ BASE_PATH }/images/${ user.picture }` } alt="user" style={ { width: "150px", height: "150px" } } />
                </Grid>
                <Grid item>
                    <MarginDiv marginTop={ 10 }>
                        <Button size='small' onClick={ handleOpenUpload } startIcon={<EditIcon />}>
                            edit
                        </Button>
                    </MarginDiv>
                </Grid>
            </Grid>
            <StyledUserDiv>
                <Grid container xs={ 12 } spacing={ 3 }>
                    <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 12 } xs={ 12 }>
                        <Grid container direction="row" spacing={ 1 }>
                            <Grid item>
                                <StyledTypography>name:</StyledTypography>
                            </Grid>
                            <Grid item>
                                <Typography>{ user?.username }</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 12 } xs={ 12 }>
                        <Grid container direction="row" spacing={ 1 }>
                            <Grid item>
                                <StyledTypography>email:</StyledTypography>
                            </Grid>
                            <Grid item>
                                <Typography>{ user?.email }</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={ 12 }>
                        <Grid container direction="column" spacing={ 1 }>
                            <Grid item>
                                <StyledTypography>quotes added by you:</StyledTypography>
                            </Grid>
                            <Grid item>
                                <Card>
                                    <Grid container alignItems="center" justifyContent="space-between">
                                        <Grid item>
                                            <Typography variant="body2">&nbsp;Click on the button to see your quotes list.</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Button size="small" variant="contained" onClick={ () => setOpenUserAddedQuotes(true) }>
                                                open
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={ 12 }>
                        <Grid container direction="column" spacing={ 1 }>
                            <Grid item>
                                <StyledTypography>quotes commented by you:</StyledTypography>
                            </Grid>
                            <Grid item>
                                <Card>
                                    <Grid container alignItems="center" justifyContent="space-between">
                                        <Grid item>
                                            <Typography variant="body2">&nbsp;Click on the button to see the quotes which grabbed your attention.</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Button size="small" variant="contained" onClick={ () => setOpenCommentedQuotesCard(true) }>
                                                open
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </StyledUserDiv>

            <div style={ { display: "flex", flex: 1, alignItems: "flex-end", justifyContent: "space-between" } }>
                <StyledFab size="small" color="primary" aria-label="add" variant="extended" onClick={ openAddQuote }>
                    <AddIcon />
                    Add quote
                </StyledFab>

                <StyledFab size="small" color="primary" aria-label="add" variant="extended" onClick={ handleLogout }>
                    <ExitToAppIcon />
                    Log out
                </StyledFab>
            </div>


            { openCommentedQuotesCard &&
                <CommentedQuotes
                    openDialog={ openCommentedQuotesCard }
                    setOpenDialog={ setOpenCommentedQuotesCard }
                />
            }

            { openUserAddedQuotes &&
                <AddedQuotes
                    openDialog={ openUserAddedQuotes }
                    setOpenDialog={ setOpenUserAddedQuotes }
                />
            }

            { openUploadDialog &&
                <UploadPhoto
                    openUploadDialog={ openUploadDialog }
                    setOpenUploadDialog={ setOpenUploadDialog }
                    file={ file }
                    setFile={ setFile }
                    user={ user }
                    getUser={ getUser }
                />
            }

            { openQuoteDialog &&
                <AddQuote
                    openQuoteDialog={ openQuoteDialog }
                    setOpenQuoteDialog={ setOpenQuoteDialog }
                />
            }

        </React.Fragment>
    )
}

export default Profile;
