import * as ActionTypes from "./ActionTypes";

export const Feedback = (state = {
    feedback: []
}, action) => {
switch (action.type) {
    case ActionTypes.ADD_FEEDBACKS:
        return {...state, feedback: action.payload}

    default:
      return state;
  }
};