import { Grid } from '@material-ui/core';
import React from 'react';
import { StyledCard } from './MainPage.style';
import Header from './components/Header';
import Quotes from '../Quotes/Quotes';
import UserDetails from '../UserProfile/UserDetails';

const MainPage: React.FC = () =>
{
    const [activeRoute, setActiveRoute] = React.useState<string>("quotes");

    return (
        <Grid container xs={ 12 } justifyContent="center" alignItems="center" style={ { height: "100vh" } }>
            <Grid item xl={ 8 } lg={ 8 } md={ 8 } sm={ 12 } xs={ 12 }>
                <StyledCard square elevation={ 5 }>
                    <Header activeRoute={ activeRoute } setActiveRoute={ setActiveRoute } />

                    { activeRoute === "quotes" &&
                        <Quotes />
                    }

                    { activeRoute === "profile" &&
                        <UserDetails />
                    }
                </StyledCard>
            </Grid>
        </Grid>
    )
}

export default MainPage
