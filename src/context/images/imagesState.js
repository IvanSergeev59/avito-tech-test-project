import React, {useReducer} from "react";
import { ImagesContext } from './imagesContext';
import axios from 'axios';
import {imagesReducer} from './imagesReducer';
import {FETCH_IMAGES, FETCH_MODAL_IMAGE, CLOSE_MODAL_WINDOW} from '../types';



export const ImagesState = ({children}) => {
    const initialState = {
    baseUrl: 'https://boiling-refuge-66454.herokuapp.com/images',
    images:[],
    loading: true,
    modalImage:'',
    modalComments:[],
    modalDisplay: false,
    modalLoading: true
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
                comments: res.data.comments
            };
            dispatch(({type: FETCH_MODAL_IMAGE, payload: image}))
        })
    }

    const closeModalWindow = () => {dispatch(({type: CLOSE_MODAL_WINDOW}))}

    const {images, loading, modalImage, modalDisplay, modalComments, modalLoading} = state
    return (
        <ImagesContext.Provider value={{fetchImages, closeModalWindow, fetchModalImage, modalImage, modalDisplay, images, loading, modalComments, modalLoading}}>
            {children}
        </ImagesContext.Provider>
    )
}