import React, { useContext, useState } from "react";
import { ImagesContext } from "../../context/images/imagesContext";
import close from '../../images/close.png';

const ModalWindow = () => {
    const {modalImage, modalDisplay, closeModalWindow, modalComments, modalLoading, addCommentToImage, modalError, changeOverlayStatus} = useContext(ImagesContext);
    const onCloseButton = () => {
        closeModalWindow();
        changeOverlayStatus('overlay-hide');
    }

    const [valueError, setValueError] = useState('');
    const onClickSubmit = (event) => {
        event.preventDefault();       
        const valueForm = event.target.parentNode.elements;
        let comments = {date: valueForm.userName.value, text: valueForm.userComment.value};  
        if (comments.date.length>0 && comments.text.length>0) {
            addCommentToImage(comments);
            setValueError('')
            valueForm.userName.value = '';
            valueForm.userComment.value = '';
            
        }
        else {setValueError(<p className="_red-form">Заполните оба поля</p>);}
       }
    
    const CommentsCointainer = () => {
        return (            
                modalComments.map(item => { return (
                    
                        <div className="_right-side_comment" key={item.id}>
                            <p className="_comment_date" >{item.date}</p>
                            <p className="_comment_text">{item.text}</p>
                        </div>                    
                )})                
        )
    }

    return (           
            <React.Fragment>
                {modalError ?
                    <p>Ошибка загрузки</p>
                    :
                    <div>
                        {modalDisplay ?
                            <div className="modalWindow">
                                <div className="_left-side">
                                    {modalLoading
                                    ?
                                    <div className="lds-dual-ring"></div>
                                    : <img src={modalImage} alt="big"/>  
                                    }
                                    <form className="_left-side_form">
                                        <p className="_form_input"><input placeholder="Ваше имя" name="userName"></input></p>
                                        <p className="_form_input"><input placeholder="Ваш комментарий" name="userComment"></input></p>
                                        {valueError}
                                        <input type="submit" className="_form_submit" onClick={onClickSubmit} disable="true" value="Оставить комментарий "></input>
                                    </form> 
                                </div>
                                <div className="_right-side">
                                    <CommentsCointainer />  
                                </div>
                                <div className="_modalWindow_close" onClick={onCloseButton}>
                                    <img src={close}   alt="close" />
                                </div>
                                
                            </div> 
                        :null}
                    </div>
                }
            </React.Fragment>
        
    )
}

export default ModalWindow