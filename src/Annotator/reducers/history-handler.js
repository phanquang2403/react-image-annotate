// @flow

import type { MainLayoutState, Action } from "../../MainLayout/types"
import { setIn, updateIn, asMutable, without } from "seamless-immutable"
import moment from "moment"

const typesToSaveWithHistory = {
  BEGIN_BOX_TRANSFORM: "Transform/Move Box",
  BEGIN_MOVE_POINT: "Move Point",
  DELETE_REGION: "Delete Region",
}

export const saveToHistory = (state: MainLayoutState, name: string) =>
  updateIn(state, ["history"], (h) =>
    [
      {
        time: moment().toDate(),
        state: without(state, "history"),
        name,
      },
    ].concat((h || []).slice(0, 9))
  )



export default (reducer) => {

  return (state: MainLayoutState, action: Action) => {
    const prevState = state
    const nextState = reducer(state, action)

    if (action.type === "RESTORE_HISTORY") {
      if (state.history.length > 0) {
        console.log("UNDO")
        let newState = setIn(
          nextState.history[0].state,
          ["history"],
          nextState.history.slice(1),
        )
        // console.log("newState", newState)
          
        let valueResult = {
          ...newState,
          futureHistory : [...state.futureHistory, state.history.slice(0,1)[0]], 

        } 

        // console.log("valueResult", valueResult)

        return valueResult
      }

    }
    else if(action.type === "REDO_HISTORY"){

      let lengthFutureHistory = state.futureHistory.length
     
      if(lengthFutureHistory > 0){
        console.log("REDO")
        let indexFutureEnd = lengthFutureHistory - 1 
        let valueBack = state.futureHistory.slice(indexFutureEnd, lengthFutureHistory)[0];
        let resultFutureHistory  = state.futureHistory.slice(0,indexFutureEnd)


     
        let newState = setIn(
          nextState.history[0].state,
          ["history"],
          [
            valueBack
          ].concat(nextState.history || [])
        )
        // console.log("newState",newState)

        let resultFuture = {
          ...newState,
          futureHistory : resultFutureHistory
        }
        
        // console.log("resultFuture", resultFuture)
        return resultFuture
      }

    }
     else {
      if (
        prevState !== nextState &&
        Object.keys(typesToSaveWithHistory).includes(action.type)
      ) {
        return setIn(
          nextState,
          ["history"],
          [
            {
              time: moment().toDate(),
              state: without(prevState, "history"),
              name: typesToSaveWithHistory[action.type] || action.type,
            },
          ]
            .concat(nextState.history || [])
            .slice(0, 9)
        )
      }
    }

    return nextState
  }
}
