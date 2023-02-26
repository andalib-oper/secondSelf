import {UPDATE_FIELDS_REG, BLUR_FIELDS_REG, STATE_CLEANUP} from './actionTypes';

const initialState = {
  inputValues: {
    email: 'andalib5@gmail.com',
    firstName: 'Aliza',
    lastName: 'Quraishi',
    password: '12345678',
    cpassword: '',
  },
  inputValidity: {
    email: true,
    firstName: true,
    lastName: true,
    password: true,
    cpassword: true,
  },
  isTouched: {
    email: true,
    firstName: true,
    lastName: true,
    password: true,
    cpassword: true,
    // tnc: true,
  },
  finalFormState: true,
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

    case STATE_CLEANUP: {
      console.log('Cleaning state');
      return initialState;
    }

    default:
      return state;
  }
};

export default regReducer;
