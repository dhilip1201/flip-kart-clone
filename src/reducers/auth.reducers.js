import { authConstants } from "../actions/constants";

const initState = {
    token:null,
    user:{
        firstName : '',
        lastName: '',
        email:'',
        fullName:''
    },
    authenticate:false,
    authenticating:false,
    message:null,
    loading:'',
    error:''
}

export const authReducers= (state=initState , action)=>{
    console.log("ACTION",action);
    switch(action.type){
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true
            }
        break;

        case authConstants.LOGIN_SUCCESS:
            state={
                ...state,
                token: action.payload.token,
                user:action.payload.user,
                message:action.payload.message,
                authenticate:true,
                authenticating:false
            }
            break;
        case authConstants.LOGIN_FAILURE:
            state={
                ...state,
                authenticate:false,
                authenticating:false,
                message:action.payload.message
            }
            break;
        case authConstants.LOGOUT_REQUEST:
            state={
                ...state,
                loading:true
            }
            break;
        case authConstants.LOGOUT_SUCCESS:
            state={
                ...initState
            }
            break;
        // case authConstants.LOGOUT_FAILURE:
        //     state={
        //         ...state,
        //         error:action.payload.error
        //     }
        //     break;
        

    }
    return state;
}

