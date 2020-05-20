import {SET_USER_NAME} from "../constants/action-types"

const initialState ={
    userName: ""
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case SET_USER_NAME : {
            return { ...state, userName: action.payload }
        }
        default:
            return state
    }
}

export default rootReducer;