import { SET_USER_NAME, SET_USER_ID} from  "../constants/action-types"


export function setUserName(payload){
    return { type: SET_USER_NAME, payload}
}

export function setUserId(payload){
    return { type: SET_USER_ID, payload}
}