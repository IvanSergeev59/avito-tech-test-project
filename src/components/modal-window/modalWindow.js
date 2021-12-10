import React, { useContext } from "react";
import { ImagesContext } from "../../context/images/imagesContext";

const ModalWindow = () => {
    const {modalImage, modalDisplay} = useContext(ImagesContext)
    return (           
            <React.Fragment>
                {modalDisplay ?
                    <div className="modalWindow">
                        <div class="_left-side">
                            <img src={modalImage} alt="big"/>   
                        </div>
                        <div className="_right-side">
                            <div className="_right-side_comment">
                                <p className="_comment_date">18.12.2019</p>
                                <p className="_comment_text">Отличное фото</p>
                            </div>
                            <div className="_right-side_comment">
                                <p className="_comment_date">18.12.2019</p>
                                <p className="_comment_text">Я тут был, очень понравилось</p>
                            </div>
                        </div>
                        
                    </div> 
                :null}
            </React.Fragment>
        
    )
}

export default ModalWindow