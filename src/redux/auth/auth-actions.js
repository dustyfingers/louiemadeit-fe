import AuthActionTypes from './auth-types';

export const setEmail = email => ({ type: AuthActionTypes.SET_EMAIL, payload: email });
export const setPassword = password => ({
    type: AuthActionTypes.SET_PASSWORD,
    payload: password,
});
export const setConfirmPassword = password => ({
    type: AuthActionTypes.SET_CONFIRM_PASSWORD,
    payload: password,
});
