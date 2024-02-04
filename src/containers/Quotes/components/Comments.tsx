import React from 'react';
import { Avatar, Button, Dialog, Grid, IconButton, Paper, Typography } from '@material-ui/core';
import { CommentsCardActions, CommentsCardContent, CommentsCardHeader, CustomDialogActions, CustomDialogTitle, LikeIconButton, StyledCommentsCard, StyledDialogContent, StyledEmptyCommentsText, StyledEmptyDiv } from '../../Quotes/Quotes.style';
import { useHttpService } from '../../../services/useAxiosCustomHook';
import { useSnackbar } from '../../../utils/SnackBar';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Cookies from 'js-cookie';
import InputBase from '@material-ui/core/InputBase';
import SendIcon from '@material-ui/icons/Send';
import { useNavigate } from 'react-router-dom';
import { IMAGE_PATH } from '../../../constants/Constants';

type IComment = {
    id: number,
    comment: string,
    user_id: number,
    quote_id: number,
    likes: number,
    isUserLiked: number
};

interface IProps
{
    selectedQuoteId: number | null;
    setSelectedQuoteId: React.Dispatch<React.SetStateAction<number | null>>;
    getQuotes: () => Promise<void>;
}

const Comments: React.FC<IProps> = ({ selectedQuoteId, setSelectedQuoteId, getQuotes }) =>
{
    const { httpService } = useHttpService();
    const { showSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const [comments, setComments] = React.useState<IComment[]>([]);

    const [comment, setComment] = React.useState<string>('');

    const authUser = JSON.parse(Cookies.get('authUser') ?? "null");

    const handleClose = () =>
    {
        getQuotes();
        setSelectedQuoteId(null);
    };

    const getComments = async () =>
    {
        try
        {
            const result: any = await httpService("get", `/api/get/comments/by/quote/${ selectedQuoteId }`);

            if (result && result.status !== 1)
            {
                showSnackbar(result.message);

                if (result.message === "Your token is expired. Login again :(")
                {
                    navigate("/")
                }

                return;
            }

            setComments(result.data.comments);

        } catch (error: any)
        {
            showSnackbar(error.message);
        }
    };

    React.useEffect(() =>
    {
        getComments();
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        const trimmedValue = event.target.value.trimStart().replace(/\s+/g, ' ');
        setComment(trimmedValue);
    };

    const handleSubmitComment = async (e: any) =>
    {
        e.preventDefault();

        if (!comment)
        {
            showSnackbar("comment should be between 3 and 200 characters.");
            return;
        }

        const payload = {
            quote_id: selectedQuoteId,
            comment
        };

        try
        {
            const result: any = await httpService("post", "/api/post/comment", payload);

            if (result && result.status === 1)
            {
                setComment('');
                getComments();
            }
            else
            {
                showSnackbar(result.message);

                if (result.message === "Your token is expired. Login again :(")
                {
                    navigate("/")
                }
            }

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
                getComments();
            }
            else
            {
                showSnackbar(result && result.message)

                if (result.message === "Your token is expired. Login again :(")
                {
                    navigate("/")
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
                getComments();
                getQuotes();
            }
            else
            {
                showSnackbar(result.message);

                if (result.message === "Your token is expired. Login again :(")
                {
                    navigate("/")
                }
            }

        } catch (error: any)
        {
            showSnackbar(error.message);
        }
    };

    return (
        <Dialog
            open={ selectedQuoteId !== null }
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth
            maxWidth={ "sm" }
        >
            <CustomDialogTitle id="alert-dialog-slide-title">
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography>Comments</Typography>
                    </Grid>
                    <Grid item>
                        <Button onClick={ handleClose } color="primary" variant="outlined">
                            Close
                        </Button>
                    </Grid>
                </Grid>
            </CustomDialogTitle>
            <StyledDialogContent>
                { comments.map((item: any, idx: number) => (
                    <StyledCommentsCard key={ idx } marginTop={ idx !== 0 ? 10 : 0 }>
                        <CommentsCardHeader
                            avatar={
                                <Avatar src={ `${ IMAGE_PATH }/${ item.picture }` } aria-label="user avatar" style={ { width: "30px", height: "30px" } } />
                            }
                            title={ <Typography variant="caption">{ item.username }</Typography> }
                        />
                        <CommentsCardContent>
                            <Typography>{ item.comment }</Typography>
                        </CommentsCardContent>
                        <CommentsCardActions>
                            <Grid container justifyContent="flex-end" alignItems="flex-end" spacing={ 1 }>

                                <Grid item>
                                    <Typography variant="caption">{ item.likes }</Typography>
                                    <LikeIconButton size="small" isLiked={ item.isUserLiked } onClick={ () => handleCommentLikes(item.isUserLiked, item.quote_id, item.id) }>
                                        <FavoriteIcon />
                                    </LikeIconButton>
                                </Grid>

                                { authUser.id === item.user_id &&
                                    <Grid item>
                                        <IconButton size="small" onClick={ () => deleteComment(item.id) }>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                }

                            </Grid>
                        </CommentsCardActions>
                    </StyledCommentsCard>
                )) }
                { !comments.length &&
                    <StyledEmptyDiv>
                        <StyledEmptyCommentsText>No comments for this quote yet.</StyledEmptyCommentsText>
                    </StyledEmptyDiv>
                }

            </StyledDialogContent>
            <CustomDialogActions>
                <form onSubmit={ handleSubmitComment }>
                    <Paper>
                        <InputBase
                            placeholder="Add your comment here..."
                            inputProps={ { 'aria-label': 'Add your comment here.' } }
                            value={ comment }
                            onChange={ handleInputChange }
                            autoFocus
                        />
                        <IconButton type="submit" color="primary" aria-label="send">
                            <SendIcon />
                        </IconButton>
                    </Paper>
                </form>
            </CustomDialogActions>
        </Dialog>
    )
}

export default Comments
