import {UPDATE_FIELDS_REG, BLUR_FIELDS_REG, STATE_CLEANUP_REG} from './actionTypes';

const initialState = {
  inputValues: {
    email: '',
    name: '',
    phoneNo: '',
    password: '',
  },
  inputValidity: {
    email: false,
    name: false,
    phoneNo: false,
    password: false,
  },
  isTouched: {
    email: false,
    name: false,
    phoeNo: false,
    password: false,
  },
  finalFormState: false,
};

const regReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FIELDS_REG: {
      const newInputValue = {
        ...state.inputValues,
        [action.fieldId]: action.val,
      };
      const newInputValidity = {
        ...state.inputValidity,
        [action.fieldId]: action.isValid,
      };

      let newFinalFormState = true;
      for (const key in newInputValidity) {
        newFinalFormState = newFinalFormState && newInputValidity[key];
      }

      return {
        ...state,
        inputValues: newInputValue,
        inputValidity: newInputValidity,
        finalFormState: newFinalFormState,
      };
    }

    case BLUR_FIELDS_REG: {
      const newInputIsTouched = {...state.isTouched, [action.fieldId]: true};
      return {...state, isTouched: newInputIsTouched};
    }

    case STATE_CLEANUP_REG: {
      // console.log('Cleaning state reg');
      return initialState;
    }

    default:
      return state;
  }
};

export default regReducer;
