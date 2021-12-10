import React, { useContext } from "react";
import { ImagesContext } from "../../context/images/imagesContext";
import close from '../../images/close.png';

const ModalWindow = () => {
    const {modalImage, modalDisplay, closeModalWindow, modalComments, modalLoading} = useContext(ImagesContext);
    const onCloseButton = () => {
        closeModalWindow()
    }
    const CommentsCointainer = () => {
        return (
            modalComments.map(item => { return (
                <div className="_right-side">
                    <div className="_right-side_comment">
                        <p className="_comment_date">{item.date}</p>
                        <p className="_comment_text">{item.text}</p>
                    </div>
                </div>    
            )})
        )
    }

    return (           
            <React.Fragment>
                {modalDisplay ?
                    <div className="modalWindow">
                        <div className="_left-side">
                            {modalLoading
                            ?
                            <div className="lds-dual-ring"></div>
                            : <img src={modalImage} alt="big"/>  
                            }
                            <form className="_left-side_form">
                                <p className="_form_input"><input placeholder="Ваше имя" ></input></p>
                                <p className="_form_input"><input placeholder="Ваш комментарий" ></input></p>
                                <input type="submit" className="_form_submit" value="Оставить комментарий"></input>
                            </form> 
                        </div>
                        <CommentsCointainer />  
                        <div className="_modalWindow_close" onClick={onCloseButton}>
                            <img src={close}   alt="close" />
                        </div>
                        
                    </div> 
                :null}
            </React.Fragment>
        
    )
}

export default ModalWindow