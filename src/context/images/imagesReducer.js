import { FETCH_IMAGES, FETCH_MODAL_IMAGE, CLOSE_MODAL_WINDOW, ADD_COMMENT, FETCH_MODAL_IMAGE_ERROR } from "../types"

const handlers = {
    [FETCH_IMAGES]: (state, {payload}) => {
        return ({...state, images: payload, loading: false})
    },
    [FETCH_MODAL_IMAGE]: (state, {payload}) => {
        return ({...state, modalImage: payload.url, modalComments: payload.comments, modalId: payload.modalId, modalDisplay: true, modalLoading: true})
    },
    [CLOSE_MODAL_WINDOW]: (state, {payload}) => {
        return ({...state, modalDisplay: false})
    },
    [ADD_COMMENT]: (state, {payload}) => {
        return ({...state, modalComments: payload})
    },
    [FETCH_MODAL_IMAGE_ERROR]: (state) => {
        return ({...state, modalError: true})
    },
    DEFAULT: state => state
}

export const imagesReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}
