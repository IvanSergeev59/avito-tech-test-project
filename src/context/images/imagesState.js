import React, {useReducer} from "react";
import { ImagesContext } from './imagesContext';
import axios from 'axios';
import {imagesReducer} from './imagesReducer';
import {FETCH_IMAGES, FETCH_MODAL_IMAGE, CLOSE_MODAL_WINDOW, ADD_COMMENT, FETCH_MODAL_IMAGE_ERROR} from '../types';



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
    modalId:''
}

    const [state, dispatch] = useReducer (imagesReducer, initialState); 

    const fetchImages = async () => {
        const {baseUrl} = initialState
        axios.get(baseUrl)
        .then((res) => {
            let images = res.data
            dispatch(({type: FETCH_IMAGES, payload: images}))       
        })    
    }

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
        .catch((err) => {
            dispatch(({type: FETCH_MODAL_IMAGE_ERROR}))
        })
    }

    const addCommentToImage = (comment) => {
        comment.id = modalComments.length + 1;
        let newComments = modalComments.concat(comment);
        const {baseUrl} = initialState;
        const {modalId} = state;
        axios.post(`${baseUrl}/${modalId}/comments`, {name: comment.date, comment: comment.text, id:  comment.id})
        dispatch(({type:ADD_COMMENT, payload: newComments}))
    }

    const closeModalWindow = () => {dispatch(({type: CLOSE_MODAL_WINDOW}))}

    const {images, loading, modalImage, modalDisplay, modalComments, modalLoading} = state
    return (
        <ImagesContext.Provider value={{addCommentToImage, fetchImages, closeModalWindow, fetchModalImage, modalImage, modalDisplay, images, loading, modalComments, modalLoading}}>
            {children}
        </ImagesContext.Provider>
    )
}