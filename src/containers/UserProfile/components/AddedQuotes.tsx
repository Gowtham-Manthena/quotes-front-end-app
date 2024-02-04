import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Button, CardContent, Collapse, Dialog, Divider, Grid, IconButton, Slide, Typography } from '@material-ui/core';
import { useHttpService } from '../../../services/useAxiosCustomHook';
import { useSnackbar } from '../../../utils/SnackBar';
import CommentIcon from '@material-ui/icons/Comment';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { MarginDiv } from '../../Autherization/Login.style';
import { CommentsCardActions, CommentsCardContent, CustomDialogTitle, LikeIconButton, StyledCommentsCard, StyledDialogContent, StyledEmptyCommentsText, StyledEmptyDiv } from '../../Quotes/Quotes.style';
import { StyledCommentIcon, UserCommentsDialogActions } from '../UserDetails.style';
import { useNavigate } from 'react-router-dom';

interface IProps
{
    openDialog: boolean;
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddedQuotes: React.FC<IProps> = ({ openDialog, setOpenDialog }) =>
{
    const { httpService } = useHttpService();
    const { showSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const authUser = JSON.parse(Cookies.get('authUser') ?? "null");

    const [quotes, setQuotes] = React.useState<any>([]);

    const [comments, setComments] = React.useState<any>([])

    const [expandQuote, setExpandQuote] = React.useState<number>(0);

    const handleClose = () =>
    {
        setOpenDialog(false);
    };

    const userQuotes = async () =>
    {
        try
        {
            const result: any = await httpService("get", "/api/get/quotes/by/user");

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
        userQuotes();
    }, []);

    const getComments = async (quote_id: number, callback: any) =>
    {
        const getCommentRes: any = await httpService("get", `/api/get/comments/by/quote/${ quote_id }`);

        if (!getCommentRes || getCommentRes.status !== 1)
        {
            showSnackbar(getCommentRes?.message);

            if (getCommentRes.message === "Your token is expired. Login again :(")
            {
                navigate("/");
            }

            return;
        }

        setComments(getCommentRes.data.comments);
        callback("success");
    }

    const handleExpandQuote = async (quote_id: number) =>
    {
        try
        {
            if (expandQuote === quote_id)
            {
                setExpandQuote(0);
                return;
            }

            await getComments(quote_id, (result: string) =>
            {
                if (result === "success")
                {
                    setExpandQuote(quote_id);
                }
            });

        } catch (error: any)
        {
            showSnackbar(error.message);
        }
    }

    const handleQuoteLikes = async (isUserLiked: number, quote_id: number) =>
    {
        try
        {
            let result: any = null;

            if (isUserLiked)
            {
                result = await httpService("post", "/api/remove/like", { user_id: authUser.id, quote_id })
            }
            else
            {
                result = await httpService("post", "/api/add/like", { user_id: authUser.id, quote_id })
            }

            if (result && result.status === 1)
            {
                userQuotes();
            }
            else
            {
                showSnackbar(result && result.message);

                if (result.message === "Your token is expired. Login again :(")
                {
                    navigate("/");
                }
            }

        } catch (error: any)
        {
            showSnackbar(error.message)
        }
    };

    const handleDeleteQuote = async (quote_id: number) =>
    {
        try
        {
            const deleteQuoteRes: any = await httpService("post", `/api/delete/quote/${ quote_id }`);

            if (!deleteQuoteRes || deleteQuoteRes.status !== 1)
            {
                showSnackbar(deleteQuoteRes?.message);

                if (deleteQuoteRes.message === "Your token is expired. Login again :(")
                {
                    navigate("/");
                }

                return;
            }

            userQuotes();

        } catch (error: any)
        {
            showSnackbar(error.message);
        }
    };

    const handleCommentLikes = async (isUserLiked: number, quote_id: number, comment_id: number) =>
    {
        try
        {
            let result: any = null;

            if (isUserLiked)
            {
                result = await httpService("post", "/api/remove/like", { user_id: authUser.id, quote_id, comment_id })
            }
            else
            {
                result = await httpService("post", "/api/add/like", { user_id: authUser.id, quote_id, comment_id })
            }

            if (result && result.status === 1)
            {
                await getComments(quote_id, (result: string) =>
                {
                    // empty
                });
            }
            else
            {
                showSnackbar(result && result.message);

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

    const deleteComment = async (comment_id: number) =>
    {
        try
        {
            const result: any = await httpService("post", "/api/delete/comment", { id: comment_id });

            if (result && result.status === 1)
            {
                setExpandQuote(0);
                userQuotes();
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

    return (
        <Dialog
            open={ openDialog }
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth
            maxWidth={ "sm" }
        >
            <CustomDialogTitle id="alert-dialog-slide-title">Quotes added by you</CustomDialogTitle>
            <StyledDialogContent>
                { quotes.map((item: any, idx: number) => (
                    <StyledCommentsCard key={ idx } marginTop={ idx !== 0 ? 10 : 0 }>
                        <CommentsCardContent>
                            <Typography>{ item.quote }</Typography>
                        </CommentsCardContent>
                        <CommentsCardActions padding={ 3 }>
                            <Grid container justifyContent="flex-end" alignItems="flex-end" spacing={ 1 }>
                                <Grid item>
                                    <Typography variant="caption">{ item.comments_count }</Typography>
                                    <IconButton size="small" onClick={ () => handleExpandQuote(item.id) }>
                                        { expandQuote === item.id ?
                                            <StyledCommentIcon />
                                            :
                                            <CommentIcon />
                                        }
                                    </IconButton>
                                </Grid>

                                <Grid item>
                                    <Typography variant="caption">{ item.likes }</Typography>
                                    <LikeIconButton size="small" isLiked={ item.isUserLiked } onClick={ () => handleQuoteLikes(item.isUserLiked, item.id) }>
                                        <FavoriteIcon />
                                    </LikeIconButton>
                                </Grid>

                                <Grid item>
                                    <IconButton size="small" onClick={ () => handleDeleteQuote(item.id) }>
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>

                            </Grid>
                        </CommentsCardActions>

                        <Collapse in={ expandQuote === item.id } timeout="auto" unmountOnExit>
                            <CardContent>
                                <Divider style={ { height: "5px" } } />

                                { comments.length > 0 && comments.map((commentObj: any, idx: number) => (
                                    <>
                                        <Grid container justifyContent="space-between" alignItems="center" key={ idx }>
                                            <Grid item xs={ 10 }>
                                                <MarginDiv marginTop={ 8 } marginBottom={ 8 }>
                                                    <Typography variant="body2">{ commentObj?.comment }</Typography>
                                                </MarginDiv>
                                            </Grid>
                                            <Grid item xs={ 1 }>
                                                <Typography variant="caption">{ commentObj.likes }</Typography>
                                                <LikeIconButton size="small" isLiked={ commentObj.isUserLiked } onClick={ () => handleCommentLikes(commentObj.isUserLiked, commentObj.quote_id, commentObj.id) }>
                                                    <FavoriteIcon />
                                                </LikeIconButton>
                                            </Grid>

                                            <Grid item xs={ 1 }>
                                                { authUser.id === commentObj.user_id &&
                                                    <IconButton size="small" onClick={ () => deleteComment(commentObj.id) }>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                }
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
                        <StyledEmptyCommentsText>You haven't added any quotes yet.</StyledEmptyCommentsText>
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

export default AddedQuotes
