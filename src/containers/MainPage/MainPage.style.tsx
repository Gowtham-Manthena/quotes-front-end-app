import React from 'react';
import { Card, IconButton } from '@material-ui/core';
import styled from 'styled-components';

export const StyledCard = styled((props: any) => <Card { ...props } />)`
    display: flex;
    flex-direction: column;
    background-color: lightslategray;
    color: white;
    border-radius: 15px;
    height: 750px;
`;

export const StyledIconButton = styled((props: any) => <IconButton { ...props } />)`
    background-color: ${(props) => props.active && "darkgreen"};
    &:hover {
        background-color: ${(props) => props.active && "darkgreen"};
    }
`;