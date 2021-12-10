import React, { useContext, useEffect }  from "react";
import { ImagesContext } from "../../context/images/imagesContext";

const Images = () => {
    const {fetchImages, fetchModalImage, images, loading} = useContext(ImagesContext);
        useEffect(() => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            fetchImages()}, [] ); 
            
    const ImagesContainer = () => {   
        const onImgClick = (event) => {
            fetchModalImage(event.target.id)
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
            <ImagesContainer />                       
        </div>
    )
}

export default Images