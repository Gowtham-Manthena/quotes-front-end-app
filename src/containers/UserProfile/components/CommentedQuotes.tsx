import React, { useEffect } from 'react';
import { Avatar, Button, Card, CardActions, CardContent, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, Slide, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { CommentsCardActions, CommentsCardContent, CommentsCardHeader, CustomDialogTitle, StyledCommentsCard, StyledDialogContent, StyledEmptyCommentsText, StyledEmptyDiv } from '../../Quotes/Quotes.style';
import { useHttpService } from '../../../services/useAxiosCustomHook';
import { useSnackbar } from '../../../utils/SnackBar';
import { TransitionProps } from '@material-ui/core/transitions';
import CommentIcon from '@material-ui/icons/Comment';
import DeleteIcon from '@material-ui/icons/Delete';
import { MarginDiv } from '../../Autherization/Login.style';
import { UserCommentsDialogActions } from '../UserDetails.style';
import { useNavigate } from 'react-router-dom';
import { IMAGE_PATH } from '../../../constants/Constants';


interface IProps
{
    openDialog: boolean;
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentedQuotes: React.FC<IProps> = ({ openDialog, setOpenDialog }) =>
{
    const { httpService } = useHttpService();
    const { showSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const [quotes, setQuotes] = React.useState<any>([]);

    const [expandQuote, setExpandQuote] = React.useState<number>(0);

    const handleClose = () =>
    {
        setOpenDialog(false);
    };

    const userCommentedQuotes = async () =>
    {
        try
        {
            const result: any = await httpService("get", "/api/get/quotes/for/which/user/added/comments");

            if (result && result.status !== 1)
            {
                showSnackbar(result.message);

                if (result.message === "Your token is expired. Login again :(")
                {
                    navigate("/");
                }

                return;
            }

            setQuotes(result.data.quotes);

        } catch (error: any)
        {
            showSnackbar(error.message)
        }

    }

    useEffect(() =>
    {
        userCommentedQuotes();
    }, []);

    const handleExpandQuote = (quote_id: number) =>
    {

        if (expandQuote === quote_id)
        {
            setExpandQuote(0);
            return;
        }

        setExpandQuote(quote_id);
    }

    const deleteComment = async (comment_id: number) =>
    {
        try
        {
            const deleteCommentRes: any = await httpService("post", `/api/delete/comment`, { id: comment_id });

            if (!deleteCommentRes || deleteCommentRes.status !== 1)
            {
                showSnackbar(deleteCommentRes?.message);

                if (deleteCommentRes.message === "Your token is expired. Login again :(")
                {
                    navigate("/");
                }

                return;
            }

            userCommentedQuotes();
            showSnackbar(deleteCommentRes?.message);

        } catch (error: any)
        {
            showSnackbar(error.message);
        }
    };

    return (
        <Dialog
            open={ openDialog }
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth
            maxWidth={ "sm" }
        >
            <CustomDialogTitle id="alert-dialog-slide-title">Quotes which you added comments</CustomDialogTitle>
            <StyledDialogContent>
                { quotes.map((item: any, idx: number) => (
                    <StyledCommentsCard key={ idx } marginTop={ idx !== 0 ? 10 : 0 }>
                        <CommentsCardHeader
                            avatar={
                                <Avatar src={ `${ IMAGE_PATH }/${ item.picture }` } aria-label="user avatar" style={ { width: "30px", height: "30px" } } />
                            }
                            title={ <Typography variant="caption">{item.username}</Typography> }
                        />
                        <CommentsCardContent>
                            <Typography>{ item.quote }</Typography>
                        </CommentsCardContent>
                        <CommentsCardActions padding={ 3 }>
                            <Grid container justifyContent="flex-end" alignItems="flex-end" spacing={ 1 }>
                                <Grid item>
                                    <IconButton size="small" onClick={ () => handleExpandQuote(item.id) }>
                                        {
                                            expandQuote === item.id ? <ExpandLessIcon /> : <ExpandMoreIcon />
                                        }
                                    </IconButton>
                                </Grid>

                            </Grid>
                        </CommentsCardActions>

                        <Collapse in={ expandQuote === item.id } timeout="auto" unmountOnExit>
                            <CardContent>
                                <Divider />

                                { item.comments && item.comments.map((commentObj: any, idx: number) => (
                                    <>
                                        <Grid container alignItems="center" key={ idx }>
                                            <Grid item xs={ 11 }>
                                                <MarginDiv marginTop={ 8 } marginBottom={ 8 }>
                                                    <Typography variant="body2">{ commentObj?.comment }</Typography>
                                                </MarginDiv>
                                            </Grid>
                                            <Grid item xs={ 1 }>
                                                <IconButton size="small" onClick={ () => deleteComment(commentObj.id) }>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                        <Divider />
                                    </>
                                )) }
                            </CardContent>
                        </Collapse>
                    </StyledCommentsCard>
                )) }

                { !quotes.length &&
                    <StyledEmptyDiv>
                        <StyledEmptyCommentsText>You haven't added comments to any quotes yet.</StyledEmptyCommentsText>
                    </StyledEmptyDiv>
                }
            </StyledDialogContent>
            <UserCommentsDialogActions>
                <Button onClick={ handleClose } color="primary" variant="outlined">
                    Close
                </Button>
            </UserCommentsDialogActions>
        </Dialog>
    )
}

export default CommentedQuotes;
