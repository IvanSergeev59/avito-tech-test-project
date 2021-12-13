import React, {useReducer} from "react";
import { ImagesContext } from './imagesContext';
import axios from 'axios';
import {imagesReducer} from './imagesReducer';
import {FETCH_IMAGES, FETCH_MODAL_IMAGE, CLOSE_MODAL_WINDOW, ADD_COMMENT, FETCH_MODAL_IMAGE_ERROR, CHANGE_OVERLAY_STATUS} from '../types';



export const ImagesState = ({children}) => {
    const initialState = {
    baseUrl: 'https://boiling-refuge-66454.herokuapp.com/images',
    images:[],
    loading: true,
    modalImage:'',
    modalComments:[],
    modalDisplay: false,
    modalLoading: true,
    modalError: false,
    modalId:'',
    overlayStatus: 'overlay-hide'
}

    const [state, dispatch] = useReducer (imagesReducer, initialState); 

    // get all images from server
    const fetchImages = async () => {
        const {baseUrl} = initialState
        axios.get(baseUrl)
        .then((res) => {
            let images = res.data
            dispatch(({type: FETCH_IMAGES, payload: images}));
        })            
    }

    // get increased image and comments, if success -> open modal window
    const fetchModalImage = async (id) => {
        const {baseUrl} = initialState;
        axios.get(`${baseUrl}/${id}`)
        .then((res) => {
            let image = {
                url: res.data.url,
                comments: res.data.comments,
                modalId: id
            };
            dispatch(({type: FETCH_MODAL_IMAGE, payload: image}))
        })
        .catch(() => {
            dispatch(({type: FETCH_MODAL_IMAGE_ERROR}))
        })
    }

    //get value of user's comment, then post it to the server and render on comments list
    const addCommentToImage = (comment) => {
        comment.id = modalComments.length + 1;
        let newComments = modalComments.concat(comment);
        const {baseUrl} = initialState;
        const {modalId} = state;
        axios.post(`${baseUrl}/${modalId}/comments`, {name: comment.date, comment: comment.text, id:  comment.id});
        dispatch(({type:ADD_COMMENT, payload: newComments}));
    }

    // change overlay's status at hide or show
    const changeOverlayStatus = (status) => {
        dispatch(({type: CHANGE_OVERLAY_STATUS, payload: status}));
    }

    // close modal window
    const closeModalWindow = () => {dispatch(({type: CLOSE_MODAL_WINDOW}))};

    const {images, loading, modalImage, modalDisplay, modalComments, modalLoading, overlayStatus, modalError} = state;

    return (
        <ImagesContext.Provider value={{changeOverlayStatus, addCommentToImage, fetchImages, closeModalWindow, fetchModalImage, modalImage, modalDisplay, images, loading, modalComments, modalLoading, overlayStatus, modalError}}>
            {children}
        </ImagesContext.Provider>
    )
}