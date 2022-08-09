import React, { memo } from 'react'
 import Button from '@mui/material/Button'; 
import isEqual from "lodash/isEqual"

const RedoHistory = ({
  state,
  history,
  fufuteHistory,
  onRedoHistory,
  
}: {
  history: Array<{ name: string, time: Date }>,
}) => {
  console.log("history",history)
  console.log("fufuteHistory",fufuteHistory)
  console.log("___________________________");

  return (
    fufuteHistory.length > 0 ? 
    (<Button variant="outlined"  size="small" onClick={() => onRedoHistory()}>
      redo
    </Button>) 
    : ''
  )
}

// export default RedoHistory


export default memo(RedoHistory, (prevProps, nextProps) =>
  isEqual(
    prevProps.history.map((a) => [a.name, a.time]),
    nextProps.history.map((a) => [a.name, a.time])
  )
)
