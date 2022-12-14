// @flow

import React, { setState, memo, useState } from "react"
import { makeStyles } from "@mui/styles"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import SidebarBoxContainer from "../SidebarBoxContainer"
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import IconButton from "@mui/material/IconButton"
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction"
import UndoIcon from "@mui/icons-material/Undo"
import moment from "moment"
import { grey } from "@mui/material/colors"
import isEqual from "lodash/isEqual"
import Box from "@mui/material/Box"
import  { without } from "seamless-immutable"

const theme = createTheme()
const useStyles = makeStyles((theme) => ({
  emptyText: {
    fontSize: 14,
    fontWeight: "bold",
    color: grey[500],
    textAlign: "center",
    padding: 20,
  },
}))

const listItemTextStyle = { paddingLeft: 16 }

export const DocumentTypesSideBarBox = ({
  documentTypes,
  onSelectDocumentTypes,
  currentDocumentType,
  initalState
}) => {
  const classes = useStyles()
 
 
  return (
    <ThemeProvider theme={theme}>
      <SidebarBoxContainer
        title="Document Types"
        icon={<FormatListBulletedIcon style={{ color: grey[700] }} />}
      >
        <List>
          {documentTypes?.map((item, index) => (
            <div className={(currentDocumentType === item?.id ?'document-selected':'') + ' document-type-item'} key={index} style={{padding:10,fontSize:13}} onClick={() => onSelectDocumentTypes(item?.id,without(initalState, "history"))}>
              {item?.name}
            </div>
          ))}
        </List>
      </SidebarBoxContainer>
    </ThemeProvider>
  )
} 

export default DocumentTypesSideBarBox
