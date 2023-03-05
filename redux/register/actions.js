import {UPDATE_FIELDS_REG, BLUR_FIELDS_REG, STATE_CLEANUP_REG} from './actionTypes';

export const updateFieldsReg = (val, fieldId, isValid) => ({
  type: UPDATE_FIELDS_REG,
  val: val,
  fieldId: fieldId,
  isValid: isValid,
});

export const blurFieldsReg = (fieldId) => ({
  type: BLUR_FIELDS_REG,
  fieldId: fieldId,
});

export const stateCleanupReg = () => ({
  type: STATE_CLEANUP_REG,
});
