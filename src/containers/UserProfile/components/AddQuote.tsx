import React from 'react';
import { CustomDialogTitle, StyledDialogContent } from '../../Quotes/Quotes.style';
import { UserCommentsDialogActions } from '../UserDetails.style';
import { Button, Card, Dialog, InputBase } from '@material-ui/core';
import { useHttpService } from '../../../services/useAxiosCustomHook';
import { useSnackbar } from '../../../utils/SnackBar';
import { useNavigate } from 'react-router-dom';

interface IProps
{
    openQuoteDialog: boolean;
    setOpenQuoteDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddQuote: React.FC<IProps> = ({ openQuoteDialog, setOpenQuoteDialog }) =>
{
    const { httpService } = useHttpService();
    const { showSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const [quote, setQuote] = React.useState<string>('');

    const handSubmit = async (e: any) =>
    {
        e.preventDefault();
        try
        {
            const result: any = await httpService("post", '/api/add/quote', { quote });

            if (result && result.status !== 1)
            {
                showSnackbar(result.message);

                if (result.message === "Your token is expired. Login again :(")
                {
                    navigate("/");
                }

                return;
            }

            showSnackbar(result.message);
            setOpenQuoteDialog(false);

        } catch (error: any)
        {
            showSnackbar(error.message);
        }
    };

    const cancelDialog = () =>
    {
        setOpenQuoteDialog(false);
    };


    return (
        <Dialog
            open={ openQuoteDialog }
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth
            maxWidth={ "sm" }
        >
            <CustomDialogTitle id="alert-dialog-slide-title">Post your quote</CustomDialogTitle>

            <form onSubmit={ handSubmit }>
                <StyledDialogContent style={ { paddingBottom: "20px" } }>

                    <Card square style={ { padding: "10px", borderRadius: "10px" } }>

                        <InputBase
                            placeholder="Type whatever you feel here..."
                            type="text"
                            required
                            style={ { width: "100%" } }
                            inputProps={ { 'aria-label': 'quote' } }
                            value={ quote }
                            onChange={ (event: any) => setQuote((event.target.value).trimStart()) }
                            autoFocus
                            rows={ 8 }
                            multiline
                        />

                    </Card>

                </StyledDialogContent>
                <UserCommentsDialogActions>
                    <Button type="submit" color="primary" variant="contained">
                        Post
                    </Button>
                    <Button variant="outlined" onClick={ cancelDialog }>
                        close
                    </Button>
                </UserCommentsDialogActions>

            </form>
        </Dialog>
    )
}

export default AddQuote;
