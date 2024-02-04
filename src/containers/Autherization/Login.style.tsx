import styled from 'styled-components';
import React from 'react';
import { Button, CardMedia, Paper } from '@material-ui/core';

export const MarginDiv = styled((props: any) => <div { ...props } />)`
    margin-top: ${ ({ marginTop }) => marginTop ? marginTop : 0 }px;
    margin-right: ${ ({ marginRight }) => marginRight ? marginRight : 0 }px;
    margin-bottom: ${ ({ marginBottom }) => marginBottom ? marginBottom : 0 }px;
    margin-left: ${ ({ marginLeft }) => marginLeft ? marginLeft : 0 }px;
`;

export const StyledButton = styled((props: any) => <Button { ...props } />)`
    border-radius: 0px;
    width: 100%;
    padding: 10px 0px;
    color: ghostwhite;
    background-color: darkslategray;
    border-color: antiquewhite;
    &:hover {
        background-color: darkslategray;
    }
`;

export const StyledPaper = styled((props: any) => <Paper { ...props } />)`
    display: flex;
    padding: 2px 12px;
    align-items: center;
    background-color: #f2f2f2;
    height: 40px;
`;