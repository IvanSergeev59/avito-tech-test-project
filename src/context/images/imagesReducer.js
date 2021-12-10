import { FETCH_IMAGES, FETCH_MODAL_IMAGE } from "../types"

const handlers = {
    [FETCH_IMAGES]: (state, {payload}) => {
        return ({...state, images: payload, loading: false})
    },
    [FETCH_MODAL_IMAGE]: (state, {payload}) => {
        return ({...state, modalImage: payload, modalDisplay: true})
    },
    DEFAULT: state => state
}

export const imagesReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}
