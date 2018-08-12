import { USER_GET } from '../actions';

export default function (state = {
    profile: {
        user: '',
        email: '',
        freeToken: ''
    }
}, action) {
    switch (action.type) {
        case USER_GET + '_PENDING':
            return { ...state, profile: { ...state.profile }, pending: true }
        case USER_GET + '_FULFILLED':
            return { ...state, profile: action.payload.data, pending: false, error: false }
        case USER_GET + '_REJECTED':
            return { ...state, profile: { ...state.profile }, error: true, pending: false }
        default:
            return state;
    }
}