import React from 'react';
import { DialogActions, Fab, Typography } from '@material-ui/core';
import styled from 'styled-components';
import CommentIcon from '@material-ui/icons/Comment';

export const StyledUserDiv = styled((props: any) => <div { ...props } />)`
    padding: 10px;
    margin-top: 20px;
`;

export const StyledTypography = styled((props: any) => <Typography { ...props } />)`
    &.MuiTypography-root {
        color: antiquewhite;
    }
`;

export const UserCommentsDialogActions = styled((props: any) => <DialogActions { ...props } />)`
  && {
    background-color: aliceblue;
  }
`;

export const StyledFab = styled((props: any) => <Fab { ...props } />)`
  && {
    border-radius: 0px;
    text-transform: none;
  }
`;

export const StyledCommentIcon = styled((props: any) => <CommentIcon { ...props } />)`
  && {
    transform: rotate(180deg);
    color: chocolate;
  }
`;

export const StyledInput = styled((props: any) => <input { ...props } />)`
  && {
    opacity: 0;
    position: absolute;
    z-index: -1;
    overflow: hidden;
    width: 0.1px;
    height: 0.1px;
  }
`;

export const StyledLabel = styled((props: any) => <label { ...props } />)`
  && {
	cursor: pointer;
    font-size: 16px;
	padding: 6px;
    border-radius: 5px;
    background-color: gainsboro;
    color: crimson;
    display: inline-block;
  }
`;