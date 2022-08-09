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

        let newState = setIn(
          nextState.history[0].state,
          ["history"],
          nextState.history.slice(1),
        )
          
        let valueResult = {
          ...newState,
          fufuteHistory : [...state.fufuteHistory, state.history.slice(0,1)[0]], 

        } 
        return valueResult
      }

    }
    else if(action.type === "REDO_HISTORY"){

      let lengthFufuteHistory = state.fufuteHistory.length
     
      if(lengthFufuteHistory > 0){

        let indexFufute = lengthFufuteHistory - 1 
        let valueBack = state.fufuteHistory.slice(-1)[0];
        let resultFufuteHistory  = state.fufuteHistory.slice(0,indexFufute)

        const newState = setIn(
          state.history[0].state,
          ["history"],
          [
            valueBack
          ].concat(nextState.history || [])
        )

        let resultFufute = {
          ...newState,
          fufuteHistory : resultFufuteHistory
        }
        return resultFufute
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
