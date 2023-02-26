import {
    STATE_CLEANUP,
    UPDATE_FIELDS_EMAIL,
    REQ_SUCCESS_NEW_PASSWORD,
    PASSWORD_FAILURE,
    PASSWORD_SUCCESS,
    GET_ALL_EMAIL,
    REQ_START,
    REQ_SUCCESS_EMAIL_CHECK,
    BLUR_FIELDS_EMAIL,
    EMAIL_FAILURE,
    EMAIL_SUCCESS
} from './actionTypes';

const initialstate = {
    loading: true,
    email: "",
    // cpassword: "12345678",
    // npassword: "12345678",
    isValidEmail: false,
    inputValues: {
        email: "",
        cpassword:"",
        npassword: ""
    },
    inputValidity: {
        email: false,
        cpassword: false,
        npassword: false
    },
    isTouched: {
        email: false,
        cpassword:false,
        npassword: false
    },
    finalFormState: false,
};

const emailReducer = (state = initialstate, action) => {
    switch(action.type){
        case STATE_CLEANUP: {
            return initialstate;
        }
        case UPDATE_FIELDS_EMAIL: {
            const newInputValue = {
                ...state.inputValues,
                [action.fieldId]: action.val,
            };
            const newInputValidity = {
                ...state.inputValidity,
                [action.fieldId]: action.isValid,
            };

            let newFinalFormState = true;
            for (const key in newInputValidity){
                newFinalFormState = newFinalFormState && newInputValidity[key];
            }
            return{
                ...state,
                inputValues: newInputValue,
                inputValidity: newInputValidity,
                finalFormState: newFinalFormState,
            };
        }
        case BLUR_FIELDS_EMAIL: {
            const newInputIsTouched = {...state.isTouched, [action.fieldId]: true};
            return {...state, isTouched: newInputIsTouched};
        }
        case REQ_START: {
            return{
                ...state,
                loading: true,
                error: ""
            };
        }
        case REQ_SUCCESS_EMAIL_CHECK: {
            console.log("Succesfully email checked");
            return{
                ...state,
                isValidEmail: true,
                loading: false,
                error: "",
            }
        }
        case REQ_SUCCESS_NEW_PASSWORD: {
            console.log("Succesfully password check");
            return{
                ...state,
                isValidEmail: true,
                cpassword: true,
                npassword: true,
                loading: false,
                error: "",
            }
        }
        case EMAIL_SUCCESS:{
            console.log("Successfully got email")
            return{
                ...state,
                data: action.data,
                error: "",
                loading: false,
            }
        }
        case PASSWORD_SUCCESS:{
            console.log("Successfully got password")
            return{
                ...state,
                // data: action.data,
                npassword: action.data.npassword,
                cpassword: action.data.cpassword,
                error: "",
                loading: false,
            }
        }
        case EMAIL_FAILURE: {
            return{
                ...state,
                data: [],
                error: action.error,
                loading: false,
            }
        }
        case PASSWORD_FAILURE: {
            return{
                ...state,
                data: [],
                error: action.error,
                loading: false,
            }
        }
        default:
            return state;
    }
}

export default emailReducer;

