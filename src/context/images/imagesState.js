import React, {useReducer} from "react";
import { ImagesContext } from './imagesContext';
import axios from 'axios';
import {imagesReducer} from './imagesReducer';
import {FETCH_IMAGES, FETCH_MODAL_IMAGE} from '../types';



export const ImagesState = ({children}) => {
    const initialState = {
    baseUrl: 'https://boiling-refuge-66454.herokuapp.com/images',
    images:[],
    loading: true,
    modalImage:'https://picsum.photos/id/237/600/400',
    modalDisplay: false
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
            let image = res.data.url;
            dispatch(({type: FETCH_MODAL_IMAGE, payload: image}))
        })
    }

    const {images, loading, modalImage, modalDisplay} = state
    return (
        <ImagesContext.Provider value={{fetchImages, fetchModalImage, modalImage, modalDisplay, images, loading}}>
            {children}
        </ImagesContext.Provider>
    )
}