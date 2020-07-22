import config from './config/config'

export const INITIAL_STATE = {
    token: '',
    refreshToken: '',
};

export const AuthReducer = (state = INITIAL_STATE, action) => {
    const { token, refreshToken, user } = action.payload || {};
    switch (action.type) {
        case config.AuthReducer.refresh_token:
            return { ...state, token, refreshToken, user };

        case config.AuthReducer.logout:
            return INITIAL_STATE;

        case config.AuthReducer.addUserData:
            return {...state, user}

        case config.AuthReducer.login_fetch_success:
            return { ...state, token, refreshToken };

        default:
            return state;
    }
};