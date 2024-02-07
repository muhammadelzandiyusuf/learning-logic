import { GET_SELF_NUMBER } from './SelfNumberTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, { type, payload }) => {
    switch (type) {
        case GET_SELF_NUMBER:
            return {
                ...state,
                data: payload
            }
        default:
            return state
    }
}
