const INITIAL_STATE = {
    email: null,
    password: null,
    confirmPassword: null
};

const authReducer = (currentState = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_EMAIL':
            return {
                ...currentState,
                email: action.payload
            }
        case 'SET_PASSWORD':
            return {
                ...currentState,
                password: action.payload
            }
        case 'SET_CONFIRM_PASSWORD':
            return {
                ...currentState,
                confirmPassword: action.payload
            }
        default:
            return currentState;
    }
};

export default authReducer;