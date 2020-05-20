import {SET_USER_NAME, SET_USER_ID} from "../constants/action-types"

const initialState ={
    userName: "",
    userId: ""
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case SET_USER_NAME : {
            return { ...state, userName: action.payload }
        }
        case SET_USER_ID : {
            return { ...state, userId: action.payload }
        }
        default:
            return state
    }
}

export default rootReducer;