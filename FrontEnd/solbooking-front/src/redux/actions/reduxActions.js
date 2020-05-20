import { SET_USER_NAME} from  "../constants/action-types"


export function setUserName(payload){
    return { type: SET_USER_NAME, payload}
}