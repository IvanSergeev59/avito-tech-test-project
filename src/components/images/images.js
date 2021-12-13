import React, { useContext, useEffect, useState }  from "react";
import { ImagesContext } from "../../context/images/imagesContext";

const Images = () => {
    const {fetchImages, fetchModalImage, images, loading, closeModalWindow, overlayStatus, changeOverlayStatus} = useContext(ImagesContext);
        useEffect(() => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            fetchImages()}, [] );

    const onOverlayClick = () => {
        closeModalWindow();
        changeOverlayStatus('overlay-hide');
    }
            
    const Overlay = () => {
        return (
        <div className={`overlay ${overlayStatus}`} onClick={onOverlayClick}>
        </div>
        )
    }
    const ImagesContainer = () => {   
        const onImgClick = (event) => {
            fetchModalImage(event.target.id);
            changeOverlayStatus('overlay-show')

        }      
        const Image = () => {return ( images.map (                
                item => <li onClick={onImgClick} key={item.id}>
                <img id={item.id} alt="img"  src={item.url}/>
                </li>
            )  )}
            return ( 
                <ul>{loading ? <Loading /> : <Image /> }</ul>          
            )          
    }

    const Loading = () => {
        return <div className="lds-dual-ring"></div>
    }
    

    
    return (
        <div className="images">       
            <Overlay />     
            <ImagesContainer />                       
        </div>
    )
}

export default Images