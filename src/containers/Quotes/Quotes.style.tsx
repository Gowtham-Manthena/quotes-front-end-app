import React from 'react';
import { Card, CardActions, CardContent, CardHeader, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@material-ui/core';
import styled from 'styled-components';

export const StyledQoteCard = styled((props: any) => <Card { ...props } />)`
    transition: transform 0.3s ease-in-out;
    border-radius: 10px;
    background-color: aliceblue;
    &:hover {
        transform: scale(1.05);
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        background-color: lavender;
    }
`;

export const StyledCommentsCard = styled((props: any) => <Card { ...props } />)`
    transition: transform 0.3s ease-in-out;
    background-color: lavender;
    margin-top: ${ ({ marginTop }) => marginTop }px;
    &:hover {
        transform: scale(1.05);
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        background-color: lightcyan;
    }
`;

export const StyledCardHeader = styled((props: any) => <CardHeader { ...props } />)`
    & .MuiCardHeader-avatar {
        margin-right: 8px;
    }
`;

export const QuotesContainer = styled((props: any) => <div { ...props } />)`
    overflow-y: auto;
    flex: 1;
  /* Hide scrollbar for WebKit browsers (Chrome, Safari) */
    &::-webkit-scrollbar {
        width: 0.5em;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #888;
    }
    /* Hide scrollbar for firefox */
    scrollbar-width: thin;
    scrollbar-color: #888 transparent;
`;

// place the position of the div exactly at the center of the page
export const CenteredDiv = styled((props: any) => <div { ...props } />)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const CustomDialogTitle = styled((props: any) => <DialogTitle { ...props } />)`
  && {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    background-color: aliceblue;
  }
`;

export const CustomDialogActions = styled((props: any) => <DialogActions { ...props } />)`
  && {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    background-color: aliceblue;
    margin-right: 8px;
  }

  .MuiPaper-root {
    width: 100%;
    display: flex;
    padding: 2px 4px;
    align-items: center;
  }

  .MuiInputBase-root {
    margin-left: 5px;
    flex: 1;
  }
`;

export const StyledDialogContent = styled((props: any) => <DialogContent { ...props } />)`
    background-color: darkslategray;
    /* Customize scrollbar styles */
    scrollbar-width: thin; /* Firefox */
    scrollbar-color: #bdbdbd #f5f5f5; /* Firefox */

    &::-webkit-scrollbar {
      width: 8px; /* Width of the entire scrollbar */
    }

    &::-webkit-scrollbar-thumb {
      background-color: #bdbdbd; /* Color of the thumb */
      border-radius: 0px; /* Rounded corners */
    }

    &::-webkit-scrollbar-track {
      background-color: #f5f5f5; /* Color of the track */
    }
`;

export const CommentsCardHeader = styled((props: any) => <CardHeader { ...props } />)`
    padding-bottom: 0px;
    & .MuiCardHeader-avatar {
        margin-right: 6px;
    }
`;

export const CommentsCardContent = styled((props: any) => <CardContent { ...props } />)`
    padding-bottom: 2px;
`;

export const CommentsCardActions = styled((props: any) => <CardActions { ...props } />)`
    padding: ${ ({ padding }) => padding ? padding : 1 }px;
`;

export const StyledEmptyDiv = styled((props: any) => <div { ...props } />)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
`;

export const StyledEmptyCommentsText = styled((props: any) => <Typography { ...props } />)`
  color: aliceblue;
`;

export const LikeIconButton = styled((props: any) => <IconButton { ...props } />)`
    color: ${ ({ isLiked }) => isLiked && "indianred"};
`;