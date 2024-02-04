// import React from 'react';
// import { Grid, IconButton } from '@material-ui/core';
// import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
// import PersonIcon from '@material-ui/icons/Person';
// import { StyledIconButton } from '../Quotes.style';

// const Header: React.FC = () =>
// {

//     const [activeRoute, setActiveRoute] = React.useState<string>("quotes");

//     const handleClickActiveRoute = (type: string) =>
//     {
//         if (activeRoute === type) return;

//         setActiveRoute(type);
//     }

//     return (
//         <Grid container justifyContent="flex-end" alignItems="flex-end" spacing={ 2 }>
//             <Grid item>
//                 <StyledIconButton active={ activeRoute === "quotes" } onClick={ () => handleClickActiveRoute("quotes") }>
//                     <FormatQuoteIcon style={ activeRoute === "quotes" ? { color: "gainsboro" } : {} } />
//                 </StyledIconButton>
//             </Grid>
//             <Grid item>
//                 <StyledIconButton active={ activeRoute === "profile" } onClick={ () => handleClickActiveRoute("profile") }>
//                     <PersonIcon style={ activeRoute === "profile" ? { color: "gainsboro" } : {} } />
//                 </StyledIconButton>
//             </Grid>
//         </Grid>
//     )
// }

// export default Header;
