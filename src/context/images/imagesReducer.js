import { FETCH_IMAGES, FETCH_MODAL_IMAGE, CLOSE_MODAL_WINDOW } from "../types"

const handlers = {
    [FETCH_IMAGES]: (state, {payload}) => {
        return ({...state, images: payload, loading: false})
    },
    [FETCH_MODAL_IMAGE]: (state, {payload}) => {
        return ({...state, modalImage: payload.url, modalComments: payload.comments, modalDisplay: true, modalLoading: false})
    },
    [CLOSE_MODAL_WINDOW]: (state, {payload}) => {
        return ({...state, modalDisplay: false})
    },
    DEFAULT: state => state
}

export const imagesReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}
