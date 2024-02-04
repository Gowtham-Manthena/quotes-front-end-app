import React from 'react';
import { Grid, IconButton } from '@material-ui/core';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import PersonIcon from '@material-ui/icons/Person';
import { StyledIconButton } from '../MainPage.style';

interface IProps
{
    activeRoute: string;
    setActiveRoute: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<IProps> = ({ activeRoute, setActiveRoute }) =>
{
    const handleClickActiveRoute = (type: string) =>
    {
        if (activeRoute === type) return;

        setActiveRoute(type);
    }

    return (
        <div style={ { padding: "5px" } }>
            <Grid container justifyContent="flex-end" alignItems="flex-end" spacing={ 2 }>
                <Grid item>
                    <StyledIconButton active={ activeRoute === "quotes" } onClick={ () => handleClickActiveRoute("quotes") }>
                        <FormatQuoteIcon style={ activeRoute === "quotes" ? { color: "gainsboro" } : {} } />
                    </StyledIconButton>
                </Grid>
                <Grid item>
                    <StyledIconButton active={ activeRoute === "profile" } onClick={ () => handleClickActiveRoute("profile") }>
                        <PersonIcon style={ activeRoute === "profile" ? { color: "gainsboro" } : {} } />
                    </StyledIconButton>
                </Grid>
            </Grid>
        </div>
    )
}

export default Header;
