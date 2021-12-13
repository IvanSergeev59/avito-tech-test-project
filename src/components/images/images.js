import React, { useContext, useEffect, useState }  from "react";
import { ImagesContext } from "../../context/images/imagesContext";

const Images = () => {
    const {fetchImages, fetchModalImage, images, loading, closeModalWindow, overlayStatus, changeOverlayStatus} = useContext(ImagesContext);

    // loading images from server 
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        fetchImages()}, [] );

    // user clicked at overlay window
    const onOverlayClick = () => {
        closeModalWindow();
        changeOverlayStatus('overlay-hide');
        document.getElementsByName('body')[0].classList.toggle('hystmodal__opened');
    }
            
    // overlay component
    const Overlay = () => {
        return (
        <div className={`overlay ${overlayStatus}`} onClick={onOverlayClick}>
        </div>
        )
    }

    // container with images
    const ImagesContainer = () => { 
         
        const onImgClick = (event) => {
            fetchModalImage(event.target.id);
            document.getElementsByName('body')[0].classList.toggle('hystmodal__opened');
            changeOverlayStatus('overlay-show');
        } 

        const Image = () => {return ( images.map (                
                item => <li onClick={onImgClick} key={item.id}>
                <img id={item.id} alt=""  src={item.url}/>
                </li>
        ))}
            
        return ( 
            <ul>{loading ? <Loading /> : <Image /> }</ul>          
        )          
    }

    // loader
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