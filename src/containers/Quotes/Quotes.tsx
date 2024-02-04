import React from 'react';
import Cookies from 'js-cookie';
import { useHttpService } from '../../services/useAxiosCustomHook';
import { Avatar, CardActions, CardContent, Grid, IconButton, Typography } from '@material-ui/core';
import { CenteredDiv, LikeIconButton, QuotesContainer, StyledCardHeader, StyledQoteCard } from './Quotes.style';
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useSnackbar } from '../../utils/SnackBar';
import Comments from './components/Comments';
import { useNavigate } from 'react-router-dom';
import { IMAGE_PATH } from '../../constants/Constants';

type IQuote = {
    id: number;
    quote: string,
    comments_count: number;
    likes: number,
    username: string,
    picture: string,
    isUserLiked: number,
    createdAt: Date
}

const Quotes: React.FC = () =>
{
    const { httpService, loading } = useHttpService();
    const navigate = useNavigate();

    const [quotes, setQuotes] = React.useState<IQuote[]>([]);
    const [selectedQuoteId, setSelectedQuoteId] = React.useState<number | null>(null);

    const { showSnackbar } = useSnackbar();

    // const authToken = Cookies.get('authToken');
    const authUser = JSON.parse(Cookies.get('authUser') ?? "null");


    const getQuotes = async () =>
    {
        try
        {
            const result: any = await httpService("get", "/api/get/all/quotes");

            if (result && result.status === 1)
            {
                setQuotes(result.data?.quotes);
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

    React.useEffect(() =>
    {
        getQuotes();
    }, [])

    const handleOpenComments = (id: number) =>
    {
        setSelectedQuoteId(id)
    };

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
                getQuotes();
            }
            else
            {
                showSnackbar(result && result.message)
            }

        } catch (error: any)
        {
            showSnackbar(error.message);

            if (error.message === "Your token is expired. Login again :(")
            {
                navigate("/")
            }
        }
    };

    return (
        <QuotesContainer>
            <Grid container xs={ 12 } alignContent="center" alignItems="center" justifyContent="center" spacing={ quotes.length > 0 ? 1 : 0 }>
                { quotes.length > 0 && quotes.map((item, idx) => (
                    <Grid item xl={ 8 } lg={ 8 } md={ 10 } sm={ 10 } xs={ 12 } key={ idx }>
                        <StyledQoteCard square>
                            <StyledCardHeader
                                avatar={
                                    <Avatar src={ `${ IMAGE_PATH }/${ item.picture }` } alt="user" aria-label="user avatar" style={ { width: "30px", height: "30px" } }>
                                        R
                                    </Avatar>
                                }
                                title={ <Typography variant="caption">{item.username}</Typography> }
                            />
                            <CardContent>
                                <Typography>{ item.quote }</Typography>
                            </CardContent>
                            <CardActions>
                                <Grid container justifyContent="flex-end" alignItems="flex-end" spacing={ 1 }>
                                    <Grid item>
                                        <Typography variant="caption">{ item.comments_count }</Typography>
                                        <IconButton size="small" onClick={ () => handleOpenComments(item.id) }>
                                            <CommentIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="caption">{ item.likes }</Typography>
                                        <LikeIconButton size="small" isLiked={ item.isUserLiked } onClick={ () => handleQuoteLikes(item.isUserLiked, item.id) }>
                                            <FavoriteIcon />
                                        </LikeIconButton>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </StyledQoteCard>
                    </Grid>
                )) }

            </Grid>
            { quotes.length === 0 &&
                <CenteredDiv>
                    <Typography align="center">Quotes will show up here.</Typography>
                </CenteredDiv>
            }

            { selectedQuoteId &&
                <Comments
                    selectedQuoteId={ selectedQuoteId }
                    setSelectedQuoteId={ setSelectedQuoteId }
                    getQuotes={ getQuotes }
                />
            }
        </QuotesContainer>

    )
}

export default Quotes